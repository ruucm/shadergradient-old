import * as React from 'react'
import { useEffect, useRef } from 'react'
import { useSpring } from '@react-spring/core'
import { animated } from '@react-spring/three'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import './materials'
import { AxesHelper } from './comps/AxesHelper'
import { defaultProps, gradientMeshT } from '@/types'
import { dToRArr } from '@/utils'

const clock = new THREE.Clock()

export const GradientMesh: React.FC<gradientMeshT> = ({
  type,
  position,
  rotation,
  scale,

  uTime,
  uStrength,
  uDensity,
  uFrequency,
  uAmplitude,
  uSpeed,
  reflection,

  wireframe,
  colors,

  animate,
  visible,

  sceneShader,
  axesHelper,
  hoverState,
}) => {
  const mesh: any = useRef()
  const linemesh: any = useRef()
  const material: any = useRef()
  const linematerial: any = useRef()

  const meshCount = hoverState !== 0 ? 48 : 192

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
    }
  }, [mesh.current])

  const { animatedPosition } = useSpring({ animatedPosition: position })
  const { animatedRotation } = useSpring({
    animatedRotation: dToRArr(rotation),
  })

  return (
    <group>
      <animated.mesh
        ref={mesh}
        // @ts-ignore
        position={animatedPosition}
        rotation={animatedRotation}
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

        {axesHelper && <AxesHelper />}
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
          geometry={mesh.current.geometry}
        >
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

GradientMesh.defaultProps = defaultProps.GradientMesh
