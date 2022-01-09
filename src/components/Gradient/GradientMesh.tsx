import { useFrame } from '@react-three/fiber'
import * as React from 'react'
import { useRef, useEffect } from 'react'
import './GradientMaterial'
import * as THREE from 'three'
import { animated } from '@react-spring/three'
import { CubicBezierLine } from '@react-three/drei'

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
  coordinates
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

  const lineProps: any = {
    midA: [0, 0, 0],
    midB: [0, 0, 0],
    color: '#5CA4A9',
    lineWidth: 1
  }

  return (
    <animated.mesh
      ref={mesh}
      position={position}
      rotation={rotation}
      scale={scale}
    >
      {type === 'plane' && <planeGeometry args={[10, 10, 1, meshCount]} />}
      {/* {type === 'sphere' && <icosahedronBufferGeometry args={[3, meshCount]} />} */}
      {type === 'sphere' && <icosahedronBufferGeometry args={[1, 64]} />}
      {type === 'waterPlane' && (
        <planeGeometry args={[10, 10, meshCount, meshCount]} />
      )}

      {coordinates && (
        <>
          <CubicBezierLine start={[0, 0, 0]} end={[10, 0, 0]} {...lineProps} />
          <CubicBezierLine start={[0, 0, 0]} end={[0, 10, 0]} {...lineProps} />
          <CubicBezierLine start={[0, 0, 0]} end={[0, 0, 10]} {...lineProps} />
        </>
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
