"use client"

import { useEffect, useRef } from "react"

export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create the HTML structure
    containerRef.current.innerHTML = `
      <div id="sketch"></div>
      <div class="fixed z-50 top-0 left-0 loader-screen w-screen h-screen transition-all duration-300 bg-white">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div class="loading text-3xl tracking-widest whitespace-nowrap">
            <span style="--i: 0">L</span>
            <span style="--i: 1">O</span>
            <span style="--i: 2">A</span>
            <span style="--i: 3">D</span>
            <span style="--i: 4">I</span>
            <span style="--i: 5">N</span>
            <span style="--i: 6">G</span>
          </div>
        </div>
      </div>

    `

    // Add styles
    const style = document.createElement('style')
    style.textContent = `
      #sketch {
        width: 100vw;
        height: 100vh;
        background: black;
      }
      .loading span {
        animation: blur 1.5s calc(var(--i) / 5 * 1s) alternate infinite;
      }
      @keyframes blur {
        to {
          filter: blur(5px);
        }
      }
      .hollow {
        opacity: 0;
        pointer-events: none;
      }
    `
    document.head.appendChild(style)

    // Load and execute the script
    const script = document.createElement('script')
    script.type = 'module'
    script.textContent = `
      import * as kokomi from "https://esm.sh/kokomi.js";
      import * as THREE from "https://esm.sh/three";
      import gsap from "https://esm.sh/gsap";

      const fragmentShader = \`
uniform float iTime;
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform vec3 uBgColor;
uniform float uRGBShiftIntensity;
uniform float uGrainIntensity;
uniform float uVignetteIntensity;
uniform float uTransitionProgress;

highp float random(vec2 co) {
    highp float a=12.9898;
    highp float b=78.233;
    highp float c=43758.5453;
    highp float dt=dot(co.xy,vec2(a,b));
    highp float sn=mod(dt,3.14);
    return fract(sin(sn)*c);
}

vec3 grain(vec2 uv,vec3 col,float amount){
    float noise=random(uv+iTime);
    col+=(noise-.5)*amount;
    return col;
}

vec4 RGBShift(sampler2D tex,vec2 uv,float amount){
    vec2 rUv=uv;
    vec2 gUv=uv;
    vec2 bUv=uv;
    float noise=random(uv+iTime)*.5+.5;
    vec2 offset=amount*vec2(cos(noise),sin(noise));
    rUv+=offset;
    gUv+=offset*.5;
    bUv+=offset*.25;
    vec4 rTex=texture(tex,rUv);
    vec4 gTex=texture(tex,gUv);
    vec4 bTex=texture(tex,bUv);
    vec4 col=vec4(rTex.r,gTex.g,bTex.b,gTex.a);
    return col;
}

vec3 vignette(vec2 uv,vec3 col,vec3 vigColor,float amount){
    vec2 p=uv;
    p-=.5;
    float d=length(p);
    float mask=smoothstep(.5,.3,d);
    mask=pow(mask,.6);
    float mixFactor=(1.-mask)*amount;
    col=mix(col,vigColor,mixFactor);
    return col;
}

float sdCircle(vec2 p,float r) {
    return length(p)-r;
}

vec3 transition(vec2 uv,vec3 col,float progress){
    float ratio=iResolution.x/iResolution.y;
    vec2 p=uv;
    p-=.5;
    p.x*=ratio;
    float d=sdCircle(p,progress*sqrt(2.2));
    float c=smoothstep(-.2,0.,d);
    col=mix(vec3(1.),col,1.-c);
    return col;
}

void main(){
    vec2 uv=vUv;
    vec4 tex=RGBShift(tDiffuse,uv,uRGBShiftIntensity);
    vec3 col=tex.xyz;
    col=grain(uv,col,uGrainIntensity);
    col=vignette(uv,col,uBgColor,uVignetteIntensity);
    col=transition(uv,col,uTransitionProgress);
    gl_FragColor=vec4(col,1.);
}
\`;

      class Sketch extends kokomi.Base {
        create() {
          const config = { bgColor: "#0c0c0c" };
          const params = { transitionProgress: 0, enterProgress: 0, rotateSpeed: 15 };

          this.renderer.setClearColor(new THREE.Color(config.bgColor), 1);
          this.camera.position.set(0, 0, 16);

          const sumFormula = (n) => (n * (n + 1)) / 2;
          const isOdd = (n) => n % 2 === 1;

          const circleCount = 3;
          const circleImgCountUnit = 12;
          const circleImgTotalCount = circleImgCountUnit * sumFormula(circleCount);
          const resourceList = [...Array(circleImgTotalCount).keys()].map((_, i) => ({
            name: \`tex\${i + 1}\`,
            type: "texture",
            path: \`https://picsum.photos/id/\${i + 1}/320/400\`
          }));
          const am = new kokomi.AssetManager(this, resourceList);

          am.on("ready", () => {
            document.querySelector(".loader-screen")?.classList.add("hollow");

            const material = new THREE.MeshBasicMaterial();
            const r = 6.4;
            const scale = 0.8;
            const rings = [];
            const lines = [];

            for (let i = 0; i < circleCount; i++) {
              const c1 = sumFormula(i) * circleImgCountUnit;
              const c2 = sumFormula(i + 1) * circleImgCountUnit;
              const textures = Object.values(am.items).slice(c1, c2);

              const ring = new THREE.Group();
              this.scene.add(ring);
              rings.push(ring);

              textures.map((tex, j) => {
                const line = new THREE.Group();
                ring.add(line);
                lines.push(line);
                const imgScale = 0.005 * scale * (i * 0.36 + 1);
                const width = tex.image.width * imgScale;
                const height = tex.image.height * imgScale;
                const geometry = new THREE.PlaneGeometry(width, height);
                const mat = material.clone();
                mat.map = tex;
                mat.needsUpdate = true;
                const mesh = new THREE.Mesh(geometry, mat);
                const r2 = r * (i + 1);
                const ratio = j / (c2 - c1);
                const angle = ratio * Math.PI * 2;
                mesh.position.x = r2;
                mesh.rotation.z = -Math.PI / 2;
                line.rotation.z = angle;
                line.add(mesh);
                return mesh;
              });
            }

            const ce = new kokomi.CustomEffect(this, {
              fragmentShader,
              uniforms: {
                uBgColor: { value: new THREE.Color(config.bgColor) },
                uRGBShiftIntensity: { value: 0.0025 },
                uGrainIntensity: { value: 0.025 },
                uVignetteIntensity: { value: 0.8 },
                uTransitionProgress: { value: 0 }
              }
            });
            ce.addExisting();

            const wheelScroller = new kokomi.WheelScroller();
            wheelScroller.listenForScroll();

            const dragDetecter = new kokomi.DragDetecter(this);
            dragDetecter.detectDrag();
            dragDetecter.on("drag", (delta) => {
              wheelScroller.scroll.target -= (delta.x || delta.y) * 2;
            });

            this.update(() => {
              wheelScroller.syncScroll();

              rings.forEach((ring, i) => {
                ring.rotation.z += 0.0025 * (isOdd(i) ? -1 : 1) * (1 + wheelScroller.scroll.delta) * params.rotateSpeed;
              });

              lines.forEach((line) => {
                line.position.z = -THREE.MathUtils.lerp(0, 100, THREE.MathUtils.mapLinear(wheelScroller.scroll.delta, 0, 1000, 0, 1)) + THREE.MathUtils.lerp(10, 0, params.enterProgress);
              });

              ce.customPass.material.uniforms.uTransitionProgress.value = params.transitionProgress;
            });

            const t1 = gsap.timeline();
            t1.to(params, { transitionProgress: 1, duration: 1, ease: "power1.inOut" })
              .fromTo(params, { enterProgress: 0, rotateSpeed: 10 }, { enterProgress: 1, rotateSpeed: 1, duration: 1.5, ease: "power1.inOut" }, "-=1")
;
          });
        }
      }

      const sketch = new Sketch("#sketch");
      sketch.create();
    `
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(style)
      document.head.removeChild(script)
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />
}