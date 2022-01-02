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
  uDensity,
  uSpeed,
  colors,
  reflection,
  scale,
  vertexShader,
  fragmentShader,
}: any) {
  const mesh: any = useRef()
  const material: any = useRef()
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current
      ? (() => {
          if (animate)
            material.current.userData.uTime.value = clock.getElapsedTime()
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
      {/* {type === 'sphere' && <icosahedronBufferGeometry args={[3, meshCount]} />} */}
      {type === 'sphere' && <icosahedronBufferGeometry args={[1, 64]} />}
      {type === 'waterPlane' && (
        <planeGeometry args={[10, 10, meshCount, meshCount]} />
      )}

      {/* @ts-ignore */}
      <gradientMaterial
        ref={material}
        colors={colors}
        uStrength={uStrength}
        uDensity={uDensity}
        uSpeed={uSpeed}
        meshType={type}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        // wireframe
      />
    </animated.mesh>
  )
}
