import { useFrame } from "@react-three/fiber"
import * as React from "react"
import { useRef } from "react"
import "./GradientMaterial"
import * as THREE from "three"

const clock = new THREE.Clock()

const meshCount = 50

export function GradientMesh({ type, r3f }: any) {
  const mesh = useRef()
  const material: any = useRef()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current
      ? (() => {
          material.current.userData.uTime.value = clock.getElapsedTime()
          // material.current.uniforms.uNoiseStrength.value = noiseStrength
        })()
      : null
  )

  return (
    <mesh ref={mesh} rotation={[Math.PI / 2, 0, 0]}>
      {type === "plane" && <planeGeometry args={[5, 5, 1, meshCount]} />}
      {type === "sphere" && <icosahedronBufferGeometry args={[1, meshCount]} />}
      {type === "waterPlane" && (
        <planeGeometry args={[5, 5, meshCount, meshCount]} />
      )}

      {/* @ts-ignore */}
      <gradientMaterial ref={material} />
    </mesh>
  )
}
