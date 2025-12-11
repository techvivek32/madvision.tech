"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, MeshDistortMaterial, Torus, Icosahedron, Octahedron } from "@react-three/drei"
import { motion, useScroll, useTransform } from "framer-motion"
import type * as THREE from "three"

function RotatingShape({ shape = "sphere", color = "#1a1a1a", position = [0, 0, 0] as [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  const renderShape = () => {
    switch (shape) {
      case "torus":
        return (
          <Torus ref={meshRef} args={[1, 0.4, 32, 64]} position={position}>
            <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
          </Torus>
        )
      case "icosahedron":
        return (
          <Icosahedron ref={meshRef} args={[1, 0]} position={position}>
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} flatShading />
          </Icosahedron>
        )
      case "octahedron":
        return (
          <Octahedron ref={meshRef} args={[1, 0]} position={position}>
            <meshStandardMaterial color={color} metalness={0.85} roughness={0.15} flatShading />
          </Octahedron>
        )
      default:
        return (
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
              <MeshDistortMaterial color={color} metalness={0.8} roughness={0.2} distort={0.3} speed={2} />
            </Sphere>
          </Float>
        )
    }
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} />
      {renderShape()}
    </>
  )
}

interface Scroll3DElementProps {
  shape?: "sphere" | "torus" | "icosahedron" | "octahedron"
  color?: string
  size?: number
  className?: string
  parallaxStrength?: number
}

export default function Scroll3DElement({
  shape = "sphere",
  color = "#1a1a1a",
  size = 200,
  className = "",
  parallaxStrength = 50,
}: Scroll3DElementProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [parallaxStrength, -parallaxStrength])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <motion.div
      ref={ref}
      className={`pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        y,
        rotateZ: rotate,
      }}
    >
      <Canvas camera={{ position: [0, 0, 4], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <Suspense fallback={null}>
          <RotatingShape shape={shape} color={color} />
        </Suspense>
      </Canvas>
    </motion.div>
  )
}
