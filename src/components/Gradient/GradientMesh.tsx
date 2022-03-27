import { useFrame } from '@react-three/fiber'
import * as React from 'react'
import { useRef, useEffect } from 'react'
import './materials'
import * as THREE from 'three'
import { animated } from '@react-spring/three'
import { CubicBezierLine } from '@react-three/drei'

const clock = new THREE.Clock()

export function GradientMesh({
  type = 'plane',
  r3f,
  position,
  rotation,
  animate,
  uTime,
  uStrength,
  uDensity,
  uFrequency,
  uAmplitude,
  uSpeed,
  colors,
  reflection,
  scale,
  sceneShader,
  axesHelper,
  wireframe,
  meshCount,
  visible,
  hoverState,
}: any) {
  const mesh: any = useRef()
  const linemesh: any = useRef()
  const material: any = useRef()
  const linematerial: any = useRef()

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    mesh.current
      ? (() => {
          if (animate)
            material.current.userData.uTime.value = clock.getElapsedTime()
        })()
      : null
    linemesh.current
      ? (() => {
          if (linematerial.current !== undefined && animate) {
            linematerial.current.userData.uTime.value = clock.getElapsedTime()
          }
        })()
      : null
  })

  useEffect(() => {
    material.current.userData.uTime.value = uTime
    material.current.roughness = 1 - reflection
  }, [uTime, reflection])

  useEffect(() => {
    if (linemesh.current !== undefined && mesh.current !== undefined) {
      linemesh.current.rotation = mesh.current.rotation
      linemesh.current.position = mesh.current.position
      console.log(mesh.current)
      console.log(linemesh.current)
    }
  }, [mesh.current])

  const lineProps: any = {
    midA: [0, 0, 0],
    midB: [0, 0, 0],
    lineWidth: 1,
  }

  return (
    <group>
      <animated.mesh
        ref={mesh}
        position={position}
        rotation={rotation}
        scale={scale}
        visible={visible}
      >
        {type === 'plane' && <planeGeometry args={[10, 10, 1, meshCount]} />}
        {type === 'sphere' && (
          <icosahedronBufferGeometry args={[1, meshCount / 3]} />
        )}
        {type === 'waterPlane' && (
          <planeGeometry args={[10, 10, meshCount, meshCount]} />
        )}

        {axesHelper && (
          <>
            <CubicBezierLine
              start={[0, 0, 0]}
              end={[10, 0, 0]}
              color='red'
              {...lineProps}
            />
            <CubicBezierLine
              start={[0, 0, 0]}
              end={[0, 10, 0]}
              color='green'
              {...lineProps}
            />
            <CubicBezierLine
              start={[0, 0, 0]}
              end={[0, 0, 10]}
              color='blue'
              {...lineProps}
            />
          </>
        )}

        {/* @ts-ignore */}
        <gradientMaterial
          key={JSON.stringify(sceneShader, null, 0)}
          ref={material}
          colors={colors}
          uStrength={uStrength}
          uDensity={uDensity}
          uFrequency={5.5}
          uAmplitude={uAmplitude}
          uSpeed={uSpeed}
          meshType={type}
          vertexShader={sceneShader.vertex}
          fragmentShader={sceneShader.fragment}
          wireframe={wireframe}
        />
      </animated.mesh>
      {mesh.current !== undefined && (
        <lineSegments
          ref={linemesh}
          renderOrder={1}
          position={mesh.current.position}
          rotation={mesh.current.rotation}
          visible={hoverState !== 0 ? true : false}
          /* @ts-ignore */
          geometry={mesh.current.geometry}
        >
          {/* @ts-ignore */}
          <lineMaterial
            key={JSON.stringify(sceneShader, null, 0)}
            ref={linematerial}
            colors={colors}
            uStrength={uStrength}
            uDensity={uDensity}
            uFrequency={uFrequency}
            uAmplitude={uAmplitude}
            uSpeed={uSpeed}
            meshType={type}
            vertexShader={sceneShader.vertex}
            fragmentShader={sceneShader.fragment}
          />
        </lineSegments>
      )}
    </group>
  )
}
