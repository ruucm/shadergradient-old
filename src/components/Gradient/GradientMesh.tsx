import { useFrame } from '@react-three/fiber'
import * as React from 'react'
import { useRef, useEffect } from 'react'
import './GradientMaterial'
import * as THREE from 'three'
import { animated } from '@react-spring/three'

const clock = new THREE.Clock()

const meshCount = 200

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
  scale,
}: any) {
  const mesh: any = useRef()
  const material: any = useRef()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current
      ? (() => {
          if (animate) {
            material.current.userData.uTime.value = clock.getElapsedTime()
            // material.current.uniforms.uNoiseStrength.value = noiseStrength
            // if (type === 'sphere') mesh.current.rotation.y += 0.003
          }
        })()
      : null
  )

  useEffect(() => {
    material.current.userData.uTime.value = uTime
    material.current.roughness = 1 - reflection
  }, [uTime, reflection])

  return (
    <animated.mesh
      ref={mesh}
      position={position}
      rotation={rotation} // rotate mesh to get more lights
      scale={scale}
    >
      {type === 'plane' && <planeGeometry args={[10, 10, 1, meshCount]} />}
      {type === 'sphere' && <icosahedronBufferGeometry args={[3, meshCount]} />}
      {type === 'waterPlane' && (
        <planeGeometry args={[10, 10, meshCount, meshCount]} />
      )}

      {/* @ts-ignore */}
      <gradientMaterial
        ref={material}
        colors={colors}
        uStrength={uStrength}
        uSpeed={uSpeed}
      />
    </animated.mesh>
  )
}
