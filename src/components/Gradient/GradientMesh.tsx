import { useFrame } from '@react-three/fiber'
import * as React from 'react'
import { useRef, useEffect } from 'react'
import './GradientMaterial'
import * as THREE from 'three'

const clock = new THREE.Clock()

const meshCount = 50

export function GradientMesh({
  type = 'plane',
  r3f,
  position,
  rotation,
  animate,
  uTime,
  uStrength,
  uSpeed,
  colors,
  reflection,
}: any) {
  const mesh = useRef()
  const material: any = useRef()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current
      ? (() => {
          if (animate)
            material.current.userData.uTime.value = clock.getElapsedTime()
          // material.current.uniforms.uNoiseStrength.value = noiseStrength
        })()
      : null
  )

  useEffect(() => {
    material.current.userData.uTime.value = uTime
    material.current.roughness = 1 - reflection
  }, [uTime, reflection])

  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={rotation} // rotate mesh to get more lights
    >
      {type === 'plane' && <planeGeometry args={[5, 5, 1, meshCount]} />}
      {type === 'sphere' && <icosahedronBufferGeometry args={[1, meshCount]} />}
      {type === 'waterPlane' && (
        <planeGeometry args={[5, 5, meshCount, meshCount]} />
      )}

      {/* @ts-ignore */}
      <gradientMaterial
        ref={material}
        colors={colors}
        uStrength={uStrength}
        uSpeed={uSpeed}
      />
    </mesh>
  )
}
