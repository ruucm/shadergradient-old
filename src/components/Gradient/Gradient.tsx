import { PerspectiveCamera } from '@react-three/drei'
import { Camera, Euler, useFrame, useThree } from '@react-three/fiber'
import * as React from 'react'
import { Suspense, useEffect, useState } from 'react'
import { usePostProcessing } from '../../hooks/use-post-processing'
import { GradientMesh } from './GradientMesh'
import * as THREE from 'three'
import { Environment } from '@/lib/Environment'

export type GradientPropsT = {
  r3f?: boolean
  type?: 'plane' | 'sphere' | 'waterPlane'
  postProcessing?: 'threejs' | 'r3f'
  environment?: any
  lights?: any
  position?: Euler | undefined
  rotation?: Euler | undefined
  scale?: any
  cameraPosition?: { x: number; y: number; z: number }
  cameraRotation?: { x: number; y: number; z: number }
  cameraQuaternion?: { x: number; y: number; z: number }
  cameraZoom?: number
  uTime?: number
  animate?: boolean
  uStrength?: number
  uSpeed?: number
  colors?: string[]
  grain?: 'on' | 'off'
  lightType?: 'env' | '3d'
  envPreset?: 'city' | 'lobby' | 'dawn'
  reflection?: number
  brightness?: number
  loadingCallback?: (percentage: number) => void
}

function LoadingBox() {
  return (
    <mesh rotation={[0, 1, 1]}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshPhysicalMaterial color='orange' />
    </mesh>
  )
}
const vec = new THREE.Vector3()

export const Gradient: React.FC<GradientPropsT> = ({
  r3f,
  type = 'plane',
  postProcessing = 'threejs',
  environment = <Environment preset='lobby' background={true} />,
  lights = <ambientLight intensity={1} />,
  position = [0, 0, 0],
  rotation = [(Math.PI / 360) * 90, 0, (Math.PI / 360) * 230],
  scale,
  cameraPosition = { x: 0.4, y: -0.2, z: -5 },
  cameraRotation = { x: 0, y: 0, z: 0 },
  cameraQuaternion = { x: 0, y: 0, z: 0 },
  cameraZoom = 2.4,
  uTime = 0.2,
  animate = true,
  uStrength = 1.6,
  uSpeed = 0.3,
  colors = ['#CC4C6E', '#1980FF', '#99B58F'],
  grain = 'on',
  lightType = 'env',
  envPreset = 'city',
  reflection = 0.1,
  brightness = 1.2,
  loadingCallback,
}) => {
  const { camera }: { camera: Camera } = useThree()
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
  camera.zoom = cameraZoom
  camera.updateProjectionMatrix() // need to update camera's zoom

  usePostProcessing({ on: postProcessing === 'threejs', grain: grain === 'on' })

  let controlledEnvironment = environment
  if (envPreset)
    controlledEnvironment = (
      <Environment
        preset={envPreset}
        background={false}
        loadingCallback={loadingCallback}
      />
    )

  let controlledLights = lights
  if (brightness) controlledLights = <ambientLight intensity={brightness} />

  return (
    <>
      <Suspense fallback='Load Failed'>
        {lightType === 'env' ? controlledEnvironment : controlledLights}

        <GradientMesh
          key={colors.toString()}
          type={type}
          position={position}
          rotation={rotation}
          scale={scale}
          animate={animate}
          uTime={uTime}
          uStrength={uStrength}
          uSpeed={uSpeed}
          colors={colors}
          reflection={reflection}
        />

        {/* <EffectComposer>
        <Noise opacity={0.3} />
      </EffectComposer> */}
      </Suspense>
    </>
  )
}
