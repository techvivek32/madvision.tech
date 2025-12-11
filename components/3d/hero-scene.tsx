"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Environment, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import * as THREE from "three"

function TechGrid() {
  const gridRef = useRef<THREE.Group>(null)

  const lines = useMemo(() => {
    const arr = []
    for (let i = -10; i <= 10; i++) {
      arr.push(
        <line key={`h-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([-10, -3, i, 10, -3, i])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#222" transparent opacity={0.3} />
        </line>,
      )
      arr.push(
        <line key={`v-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([i, -3, -10, i, -3, 10])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#222" transparent opacity={0.3} />
        </line>,
      )
    }
    return arr
  }, [])

  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 1
    }
  })

  return <group ref={gridRef}>{lines}</group>
}

function MorphingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse, viewport } = useThree()

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        (mouse.x * viewport.width) / 10,
        0.02,
      )
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        (mouse.y * viewport.height) / 10 + 0.5,
        0.02,
      )
      meshRef.current.rotation.y = t * 0.15
      meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[2, 128, 128]} position={[0, 0.5, 0]}>
        <MeshDistortMaterial
          color="#0a0a0a"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={2}
          distort={0.3}
          speed={2}
        />
      </Sphere>
    </Float>
  )
}

function OrbitingCubes() {
  const groupRef = useRef<THREE.Group>(null)

  const cubes = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 4 + Math.random() * 0.5,
      speed: 0.2 + Math.random() * 0.3,
      size: 0.1 + Math.random() * 0.15,
      yOffset: (Math.random() - 0.5) * 2,
    }))
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const cube = cubes[i]
        const t = state.clock.elapsedTime * cube.speed + cube.angle
        child.position.x = Math.cos(t) * cube.radius
        child.position.z = Math.sin(t) * cube.radius
        child.position.y = cube.yOffset + Math.sin(t * 2) * 0.3
        child.rotation.x = t
        child.rotation.y = t * 0.5
      })
    }
  })

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <mesh key={i}>
          <boxGeometry args={[cube.size, cube.size, cube.size]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
    </group>
  )
}

function DataParticles() {
  const particlesRef = useRef<THREE.Points>(null)

  const { positions, velocities } = useMemo(() => {
    const count = 200
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 25
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5
      velocities[i * 3] = (Math.random() - 0.5) * 0.01
      velocities[i * 3 + 1] = Math.random() * 0.02 + 0.01
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01
    }

    return { positions, velocities }
  }, [])

  useFrame(() => {
    if (particlesRef.current) {
      const pos = particlesRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < pos.length / 3; i++) {
        pos[i * 3 + 1] += velocities[i * 3 + 1]
        if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#333333" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function FloatingRings() {
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const ring3Ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.2
      ring1Ref.current.rotation.y = t * 0.1
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.15
      ring2Ref.current.rotation.z = t * 0.1
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.25
      ring3Ref.current.rotation.z = -t * 0.08
    }
  })

  return (
    <>
      <mesh ref={ring1Ref} position={[0, 0.5, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 100]} />
        <meshStandardMaterial color="#333" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0.5, 0]}>
        <torusGeometry args={[3.8, 0.015, 16, 100]} />
        <meshStandardMaterial color="#444" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh ref={ring3Ref} position={[0, 0.5, 0]}>
        <torusGeometry args={[4.4, 0.01, 16, 100]} />
        <meshStandardMaterial color="#555" metalness={0.9} roughness={0.1} />
      </mesh>
    </>
  )
}

function Scene() {
  return (
    <>
      <color attach="background" args={["#f8f8f8"]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} color="#ffffff" />
      <spotLight position={[0, 15, 0]} angle={0.3} penumbra={1} intensity={1} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />

      <MorphingSphere />
      <FloatingRings />
      <OrbitingCubes />
      <DataParticles />
      <TechGrid />

      <Environment preset="city" />

      <EffectComposer>
        <Bloom intensity={0.15} luminanceThreshold={0.9} luminanceSmoothing={0.9} />
        <Vignette darkness={0.25} offset={0.5} />
      </EffectComposer>
    </>
  )
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
