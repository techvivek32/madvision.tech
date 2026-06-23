"use client"

import { useEffect, useRef, type MutableRefObject } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js"
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js"

/* ------------------------------------------------------------------ */
/*  Props                                                             */
/* ------------------------------------------------------------------ */

type JourneySceneProps = {
  /** Continuous scroll progress 0..1, written every frame from the wrapper. */
  progress: MutableRefObject<number>
  /** Discrete active stage (0..3) — overlay only; the scene reads progress. */
  active?: number
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

// Deterministic seeded PRNG (mulberry32) so the layout is SSR-safe / stable.
function mulberry32(seed: number) {
  let a = seed >>> 0
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

// Per-phase accent colors, exactly matching STAGES in build-journey.tsx.
const STOPS = [
  new THREE.Color(0xf59e0b), // R&D    amber
  new THREE.Color(0x38bdf8), // Dev    sky
  new THREE.Color(0x34d399), // QA     emerald
  new THREE.Color(0xa78bfa), // Prod   violet
]

// Cross-blended accent color for a continuous progress value.
function accentForProgress(p: number, out: THREE.Color) {
  const seg = clamp01(p) * 3 // 0..3 across 4 stops
  const i = Math.min(2, Math.floor(seg))
  const frac = seg - i
  // smooth the blend so transitions cross-fade rather than snap
  const t = smoothstep(0, 1, frac)
  out.copy(STOPS[i]).lerp(STOPS[i + 1], t)
  return out
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function JourneyScene({ progress, active }: JourneySceneProps) {
  void active // reserved for optional discrete tweaks; not read per frame
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // ---- idempotent / StrictMode-safe guards ----
    let disposed = false
    let rafId = 0

    // tracked GPU resources for guaranteed cleanup
    const geometries: THREE.BufferGeometry[] = []
    const materials: THREE.Material[] = []
    const textures: THREE.Texture[] = []

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isMobile =
      typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches

    const getSize = () => {
      const w = Math.max(1, container.clientWidth || window.innerWidth)
      const h = Math.max(1, container.clientHeight || window.innerHeight)
      return { w, h }
    }

    let { w, h } = getSize()
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    /* --------------------------- renderer --------------------------- */
    let renderer: THREE.WebGLRenderer
    try {
      // Let three create its OWN canvas (don't reuse a React-owned one) so a
      // StrictMode double-mount can't re-acquire a context on a force-lost canvas.
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      })
    } catch (e) {
      // WebGL unavailable — bail gracefully (dark placeholder stays visible).
      console.warn("[journey] WebGL unavailable", e)
      return
    }
    renderer.setClearColor(0x0a0a0f, 1)
    renderer.setPixelRatio(DPR)
    renderer.setSize(w, h, false)
    // mount three's canvas full-bleed inside the container div
    const glCanvas = renderer.domElement
    glCanvas.style.position = "absolute"
    glCanvas.style.inset = "0"
    glCanvas.style.width = "100%"
    glCanvas.style.height = "100%"
    glCanvas.style.display = "block"
    container.appendChild(glCanvas)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.outputColorSpace = THREE.SRGBColorSpace

    /* ----------------------------- scene ---------------------------- */
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0f)
    const fog = new THREE.FogExp2(0x0a0a0f, 0.018)
    scene.fog = fog

    const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100)
    camera.position.set(0, 1.2, 13)
    camera.lookAt(0, 0, 0)

    /* ---------------- particle buffer (built once) ------------------ */
    const COUNT = isMobile ? 6000 : 14000
    const rand = mulberry32(0x9e3779b9)

    const aScatter = new Float32Array(COUNT * 3)
    const aLattice = new Float32Array(COUNT * 3)
    const aValidated = new Float32Array(COUNT * 3)
    const aCrystal = new Float32Array(COUNT * 3)
    const aSeed = new Float32Array(COUNT)
    const aSize = new Float32Array(COUNT)

    // pre-sample icosahedron surface/inside for the crystal target
    const icoGeo = new THREE.IcosahedronGeometry(2.4, 1)
    const icoPos = icoGeo.getAttribute("position") as THREE.BufferAttribute
    const icoIndex = icoGeo.getIndex()
    const triCount = icoIndex ? icoIndex.count / 3 : icoPos.count / 3
    const vA = new THREE.Vector3()
    const vB = new THREE.Vector3()
    const vC = new THREE.Vector3()

    const LATTICE_STEP = 0.9
    const LATTICE_HALF = 4 // -> ~9 nodes per axis

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      aSeed[i] = rand()
      aSize[i] = 1.0 + rand() * 1.8

      // --- scatter: uniform sphere radius 6 ---
      const r = 6 * Math.cbrt(rand())
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)
      const sx = r * Math.sin(phi) * Math.cos(theta)
      const sy = r * Math.sin(phi) * Math.sin(theta)
      const sz = r * Math.cos(phi)
      aScatter[i3] = sx
      aScatter[i3 + 1] = sy
      aScatter[i3 + 2] = sz

      // --- lattice: quantize scatter onto a boxy node grid ---
      const q = (v: number) => {
        let n = Math.round(v / LATTICE_STEP)
        if (n > LATTICE_HALF) n = LATTICE_HALF
        if (n < -LATTICE_HALF) n = -LATTICE_HALF
        return n * LATTICE_STEP
      }
      const lx = q(sx)
      const ly = q(sy)
      const lz = q(sz)
      aLattice[i3] = lx
      aLattice[i3 + 1] = ly
      aLattice[i3 + 2] = lz

      // --- validated: contract 12% toward center + tiny clean jitter ---
      aValidated[i3] = lx * 0.88 + (rand() - 0.5) * 0.05
      aValidated[i3 + 1] = ly * 0.88 + (rand() - 0.5) * 0.05
      aValidated[i3 + 2] = lz * 0.88 + (rand() - 0.5) * 0.05

      // --- crystal: barycentric sample on icosahedron faces ---
      const tri = Math.floor(rand() * triCount)
      const baseA = icoIndex ? icoIndex.getX(tri * 3) : tri * 3
      const baseB = icoIndex ? icoIndex.getX(tri * 3 + 1) : tri * 3 + 1
      const baseC = icoIndex ? icoIndex.getX(tri * 3 + 2) : tri * 3 + 2
      vA.fromBufferAttribute(icoPos, baseA)
      vB.fromBufferAttribute(icoPos, baseB)
      vC.fromBufferAttribute(icoPos, baseC)
      let u = rand()
      let v2 = rand()
      if (u + v2 > 1) {
        u = 1 - u
        v2 = 1 - v2
      }
      const wgt = 1 - u - v2
      // pull a fraction inward to give the gem some volume
      const inward = 0.55 + rand() * 0.45
      aCrystal[i3] = (vA.x * wgt + vB.x * u + vC.x * v2) * inward
      aCrystal[i3 + 1] = (vA.y * wgt + vB.y * u + vC.y * v2) * inward
      aCrystal[i3 + 2] = (vA.z * wgt + vB.z * u + vC.z * v2) * inward
    }
    icoGeo.dispose()

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(aScatter.slice(), 3))
    pointsGeo.setAttribute("aScatter", new THREE.BufferAttribute(aScatter, 3))
    pointsGeo.setAttribute("aLattice", new THREE.BufferAttribute(aLattice, 3))
    pointsGeo.setAttribute("aValidated", new THREE.BufferAttribute(aValidated, 3))
    pointsGeo.setAttribute("aCrystal", new THREE.BufferAttribute(aCrystal, 3))
    pointsGeo.setAttribute("aSeed", new THREE.BufferAttribute(aSeed, 1))
    pointsGeo.setAttribute("aSize", new THREE.BufferAttribute(aSize, 1))
    geometries.push(pointsGeo)

    /* ------------------- shared uniforms ---------------------------- */
    const uniforms = {
      uProgress: { value: 0 },
      uTime: { value: 0 },
      uAccent: { value: new THREE.Color(0xf59e0b) },
      uBurst: { value: 1 },
      uScan: { value: -10 },
      uSweep: { value: -10 },
      uLaunch: { value: 0 },
      uPixelRatio: { value: DPR },
      uReduce: { value: reduceMotion ? 1 : 0 },
    }

    /* ------------------- particle shader material ------------------- */
    const pointsMat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute vec3 aScatter;
        attribute vec3 aLattice;
        attribute vec3 aValidated;
        attribute vec3 aCrystal;
        attribute float aSeed;
        attribute float aSize;

        uniform float uProgress;
        uniform float uTime;
        uniform vec3  uAccent;
        uniform float uBurst;
        uniform float uScan;
        uniform float uSweep;
        uniform float uPixelRatio;
        uniform float uReduce;

        varying vec3 vColor;
        varying float vAlpha;

        // per-particle staggered smoothstep
        float sstep(float e0, float e1, float x){
          float t = clamp((x - e0) / (e1 - e0), 0.0, 1.0);
          return t * t * (3.0 - 2.0 * t);
        }

        void main() {
          float p = uProgress;
          float stagger = (aSeed - 0.5) * 0.10;

          // sequential morph: scatter -> lattice -> validated -> crystal
          float mSL = sstep(0.20 + stagger, 0.42 + stagger, p);
          float mLV = sstep(0.48 + stagger, 0.70 + stagger, p);
          float mVC = sstep(0.72 + stagger, 0.90 + stagger, p);

          vec3 pos = mix(aScatter, aLattice, mSL);
          pos = mix(pos, aValidated, mLV);

          // coalescence swirl during crystal collapse (vortex, not straight)
          vec3 crystalPos = aCrystal;
          float ang = (1.0 - mVC) * 2.0;
          float ca = cos(ang); float sa = sin(ang);
          crystalPos.xz = mat2(ca, -sa, sa, ca) * crystalPos.xz;
          pos = mix(pos, crystalPos, mVC);

          // idle turbulence — fades out toward the settled crystal
          float turbAmp = (1.0 - sstep(0.78, 0.95, p)) * (1.0 - uReduce);
          float ph = aSeed * 6.2831 + uTime * 0.6;
          pos += vec3(sin(ph), cos(ph * 1.3), sin(ph * 0.7)) * 0.08 * turbAmp;

          // ----- color -----
          vec3 col = uAccent;

          // Dev build-sweep: brighten rows below the rising threshold
          float sweepBoost = step(pos.y, uSweep) * (1.0 - mLV) * 0.8;

          // QA scan-front: validatedAmount swept by uScan along world-Y
          float band = 0.5;
          float validated = smoothstep(uScan - band, uScan, pos.y);
          // commit to emerald once scanned
          vec3 emerald = vec3(0.203, 0.827, 0.6);
          vec3 sky = vec3(0.219, 0.741, 0.972);
          float inQA = sstep(0.46, 0.52, p) * (1.0 - sstep(0.74, 0.80, p));
          col = mix(col, mix(sky, emerald, validated), inQA);
          // white hot-edge spike at the moving scan front
          float edge = 1.0 - smoothstep(0.0, band, abs(pos.y - uScan));
          col += vec3(edge) * inQA * 0.9;

          // bug particles flicker red within the QA band
          if (aSeed < 0.04) {
            float bug = inQA * (1.0 - validated);
            col = mix(col, vec3(0.95, 0.18, 0.2), bug * 0.8);
          }

          col += col * sweepBoost;

          vColor = col;

          // ----- size / alpha -----
          float twinkle = 0.7 + 0.3 * sin(uTime * 1.5 + aSeed * 30.0);
          float size = aSize * twinkle * uBurst;

          vAlpha = 0.9;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          gl_PointSize = size * uPixelRatio * (90.0 / -mvPosition.z);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.06, d);
          if (a <= 0.001) discard;
          gl_FragColor = vec4(vColor * a, a * vAlpha);
        }
      `,
    })
    materials.push(pointsMat)
    const points = new THREE.Points(pointsGeo, pointsMat)
    points.frustumCulled = false
    scene.add(points)

    /* ------------------- lattice wireframe lines -------------------- */
    // connect axis-adjacent lattice nodes within a sampled subset
    const nodeMap = new Map<string, [number, number, number]>()
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const x = aLattice[i3]
      const y = aLattice[i3 + 1]
      const z = aLattice[i3 + 2]
      const kx = Math.round(x / LATTICE_STEP)
      const ky = Math.round(y / LATTICE_STEP)
      const kz = Math.round(z / LATTICE_STEP)
      nodeMap.set(`${kx},${ky},${kz}`, [x, y, z])
    }
    const linePos: number[] = []
    const neighborDirs = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]
    nodeMap.forEach(([x, y, z], key) => {
      const [kx, ky, kz] = key.split(",").map(Number)
      for (const [dx, dy, dz] of neighborDirs) {
        const nKey = `${kx + dx},${ky + dy},${kz + dz}`
        const n = nodeMap.get(nKey)
        if (n) {
          linePos.push(x, y, z, n[0], n[1], n[2])
        }
      }
    })
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePos), 3)
    )
    geometries.push(lineGeo)
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x38bdf8),
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    materials.push(lineMat)
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    lines.frustumCulled = false
    scene.add(lines)

    /* ------------------- nebula glow plane -------------------------- */
    const nebulaUniforms = {
      uAccent: uniforms.uAccent,
      uOpacity: { value: 0.12 },
    }
    const nebulaGeo = new THREE.PlaneGeometry(40, 40)
    geometries.push(nebulaGeo)
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: nebulaUniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying vec2 vUv;
        uniform vec3 uAccent;
        uniform float uOpacity;
        void main(){
          float d = distance(vUv, vec2(0.5));
          float g = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(uAccent * g, g * uOpacity);
        }
      `,
    })
    materials.push(nebulaMat)
    const nebula = new THREE.Mesh(nebulaGeo, nebulaMat)
    nebula.position.z = -10
    nebula.frustumCulled = false
    scene.add(nebula)

    /* ------------------- starfield -> launch streaks ---------------- */
    const STAR_COUNT = isMobile ? 800 : 1500
    const starPos = new Float32Array(STAR_COUNT * 3)
    const starSeed = new Float32Array(STAR_COUNT)
    for (let i = 0; i < STAR_COUNT; i++) {
      const i3 = i * 3
      starPos[i3] = (rand() - 0.5) * 60
      starPos[i3 + 1] = (rand() - 0.5) * 40
      starPos[i3 + 2] = -rand() * 40 - 5
      starSeed[i] = rand()
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute("aSeed", new THREE.BufferAttribute(starSeed, 1))
    geometries.push(starGeo)
    const starMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: uniforms.uTime,
        uLaunch: uniforms.uLaunch,
        uPixelRatio: uniforms.uPixelRatio,
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute float aSeed;
        uniform float uTime;
        uniform float uLaunch;
        uniform float uPixelRatio;
        varying float vA;
        void main(){
          vec3 pos = position;
          // warp dust toward camera at launch
          pos.z += uLaunch * (10.0 + aSeed * 25.0);
          vec4 mv = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mv;
          float base = 1.2 + aSeed * 1.8;
          gl_PointSize = base * uPixelRatio * (1.0 + uLaunch * 4.0) * (60.0 / -mv.z);
          vA = 0.35 + 0.4 * aSeed;
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vec3(0.8, 0.85, 1.0) * a, a * vA);
        }
      `,
    })
    materials.push(starMat)
    const stars = new THREE.Points(starGeo, starMat)
    stars.frustumCulled = false
    scene.add(stars)

    /* ------------------- optional inner crystal mesh ---------------- */
    let crystalMesh: THREE.Mesh | null = null
    let pointLight: THREE.PointLight | null = null
    if (!isMobile) {
      const crystalGeo = new THREE.IcosahedronGeometry(1.6, 0)
      geometries.push(crystalGeo)
      const crystalMat = new THREE.MeshStandardMaterial({
        color: 0x1a1530,
        emissive: new THREE.Color(0xa78bfa),
        emissiveIntensity: 0,
        flatShading: true,
        transparent: true,
        opacity: 0.28,
        roughness: 0.4,
        metalness: 0.1,
      })
      materials.push(crystalMat)
      crystalMesh = new THREE.Mesh(crystalGeo, crystalMat)
      crystalMesh.visible = false
      scene.add(crystalMesh)

      scene.add(new THREE.AmbientLight(0x222233, 0.6))
      pointLight = new THREE.PointLight(0xa78bfa, 0, 50)
      pointLight.position.set(0, 2, 6)
      scene.add(pointLight)
    }

    /* ------------------- postprocessing (non-fatal) ----------------- */
    let composer: EffectComposer | null = null
    let bloomPass: UnrealBloomPass | null = null
    let useComposer = false
    try {
      composer = new EffectComposer(renderer)
      composer.setPixelRatio(DPR)
      composer.setSize(w, h)
      composer.addPass(new RenderPass(scene, camera))
      bloomPass = new UnrealBloomPass(
        new THREE.Vector2(w, h),
        isMobile ? 0.6 : 0.9, // strength
        0.5, // radius
        0.18 // threshold
      )
      composer.addPass(bloomPass)
      composer.addPass(new OutputPass())
      useComposer = true
    } catch (e) {
      console.warn("[journey] bloom disabled, falling back to plain render", e)
      useComposer = false
      composer = null
    }

    /* ----------------------------- resize --------------------------- */
    const onResize = () => {
      if (disposed) return
      const s = getSize()
      w = s.w
      h = s.h
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h, false)
      if (composer) composer.setSize(w, h)
    }
    const resizeObserver = new ResizeObserver(onResize)
    resizeObserver.observe(container)

    /* --------------------- visibility (pause RAF) ------------------- */
    let visible = !document.hidden
    const onVisibility = () => {
      visible = !document.hidden
      if (visible && !disposed) {
        last = performance.now()
        if (!rafId) rafId = requestAnimationFrame(tick)
      }
    }
    document.addEventListener("visibilitychange", onVisibility)

    /* --------------- mouse parallax (alive / reactive) -------------- */
    const mTarget = { x: 0, y: 0 }
    const mLerp = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      mTarget.x = (e.clientX / window.innerWidth) * 2 - 1
      mTarget.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    if (!reduceMotion) window.addEventListener("pointermove", onPointerMove)

    /* ----------------------------- loop ----------------------------- */
    let cur = progress.current || 0
    let last = performance.now()
    const tmpColor = new THREE.Color()

    const tick = () => {
      if (disposed) return
      rafId = 0
      const now = performance.now()
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now

      // frame-rate-independent lerp toward scroll target
      const target = clamp01(progress.current || 0)
      if (reduceMotion) {
        cur = target
      } else {
        const k = 1 - Math.pow(0.0018, dt)
        cur += (target - cur) * k
      }

      uniforms.uProgress.value = cur
      uniforms.uTime.value += dt

      // accent color cross-blend
      accentForProgress(cur, tmpColor)
      uniforms.uAccent.value.copy(tmpColor)
      fog.color.copy(scene.background as THREE.Color).lerp(tmpColor, 0.12)
      lineMat.color.copy(tmpColor)

      // lattice line opacity: 0 in R&D, ~0.35 across Dev/QA, 0 as crystal forms
      lineMat.opacity =
        smoothstep(0.22, 0.32, cur) * (1 - smoothstep(0.8, 0.92, cur)) * 0.35

      // Dev build-sweep threshold rising bottom -> top
      uniforms.uSweep.value = lerp(-5, 5, smoothstep(0.22, 0.45, cur))

      // QA scan-front sweeping along Y
      uniforms.uScan.value = lerp(-5, 5, smoothstep(0.5, 0.75, cur))

      // Production burst gaussian @ ~0.90
      const burst = 1 + 1.4 * Math.exp(-Math.pow((cur - 0.9) / 0.04, 2))
      uniforms.uBurst.value = reduceMotion ? 1 : burst

      // launch warp
      uniforms.uLaunch.value = smoothstep(0.8, 1.0, cur)

      // nebula opacity brightest at production
      nebulaUniforms.uOpacity.value = lerp(0.12, 0.2, cur)

      // bloom strength spike with the burst
      if (bloomPass) {
        const baseStrength = isMobile ? 0.6 : 0.9
        bloomPass.strength = baseStrength + (burst - 1) * 0.65
      }

      // optional inner crystal
      if (crystalMesh) {
        const show = cur > 0.7
        crystalMesh.visible = show
        if (show) {
          const ei = lerp(0, 2.4, smoothstep(0.78, 0.95, cur))
          ;(crystalMesh.material as THREE.MeshStandardMaterial).emissiveIntensity = ei
          crystalMesh.rotation.y += dt * 0.15
          crystalMesh.rotation.x = Math.sin(uniforms.uTime.value * 0.1) * 0.2
        }
      }
      if (pointLight) {
        pointLight.color.copy(tmpColor)
        pointLight.intensity = lerp(0, 1.5, smoothstep(0.7, 0.95, cur))
      }

      // gentle group spin so the formed gem keeps life even when parked
      const idle = reduceMotion ? 0 : 1
      points.rotation.y = uniforms.uTime.value * 0.04 * idle
      lines.rotation.y = points.rotation.y
      if (crystalMesh) crystalMesh.rotation.y += 0

      // ----- camera (driven by cur) -----
      const az =
        lerp(-0.5, 0.6, cur) +
        (reduceMotion ? 0 : uniforms.uTime.value * 0.03)
      const radius = lerp(13, 9, smoothstep(0.6, 1.0, cur))
      const camY = lerp(1.2, 2.0, cur)
      const sway = reduceMotion ? 0 : Math.sin(uniforms.uTime.value * 0.15) * 0.3
      camera.position.set(
        Math.sin(az) * radius,
        camY + sway,
        Math.cos(az) * radius
      )
      // lean the camera toward the cursor for a reactive, living feel
      if (!reduceMotion) {
        mLerp.x += (mTarget.x - mLerp.x) * 0.04
        mLerp.y += (mTarget.y - mLerp.y) * 0.04
        camera.position.x += mLerp.x * 1.4
        camera.position.y += -mLerp.y * 1.0
      }
      camera.lookAt(0, 0, 0)

      // keep nebula facing the camera, behind the scene
      nebula.position.set(
        camera.position.x * -0.3,
        camera.position.y * -0.3,
        -12
      )
      nebula.lookAt(camera.position)

      if (useComposer && composer) composer.render()
      else renderer.render(scene, camera)

      if (visible && !disposed) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)

    /* ----------------------------- cleanup -------------------------- */
    return () => {
      if (disposed) return
      disposed = true
      if (rafId) cancelAnimationFrame(rafId)
      rafId = 0
      resizeObserver.disconnect()
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pointermove", onPointerMove)

      // dispose tracked resources
      for (const g of geometries) g.dispose()
      for (const m of materials) {
        // dispose any textures owned by the material
        const mm = m as unknown as Record<string, unknown>
        for (const key of [
          "map",
          "emissiveMap",
          "normalMap",
          "alphaMap",
          "aoMap",
        ]) {
          const t = mm[key]
          if (t && (t as THREE.Texture).isTexture) (t as THREE.Texture).dispose()
        }
        m.dispose()
      }
      for (const t of textures) t.dispose()

      // dispose postprocessing
      try {
        bloomPass?.dispose?.()
      } catch {}
      try {
        composer?.dispose?.()
      } catch {}

      // clear scene graph
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh
        if (mesh.geometry) mesh.geometry.dispose()
        const mat = (mesh as unknown as { material?: THREE.Material | THREE.Material[] }).material
        if (Array.isArray(mat)) mat.forEach((mm) => mm.dispose())
        else if (mat) mat.dispose()
      })
      scene.clear()

      // remove three's canvas from the DOM, then dispose + release context
      try {
        renderer.domElement.remove()
      } catch {}
      renderer.dispose()
      try {
        renderer.forceContextLoss()
      } catch {}
    }
  }, [progress])

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />
}
