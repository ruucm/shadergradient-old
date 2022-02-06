import { Environment } from '@/lib/Environment'
import { useFrame } from '@react-three/fiber'
import * as React from 'react'
import { Suspense } from 'react'
import * as THREE from 'three'
import { usePostProcessing } from '../../hooks/use-post-processing'
import { GradientMesh } from './GradientMesh'
import * as shaders from './shaders'

const vec = new THREE.Vector3()

export const Gradient: React.FC<any> = ({
  r3f,
  type = 'plane',
  postProcessing = 'threejs',
  environment = <Environment preset='lobby' background={true} />,
  lights = <ambientLight intensity={1} />,
  position = [0, 0, 0],
  rotation,
  scale,
  cameraPosition = { x: 0.4, y: -0.2, z: -5 },
  cameraRotation = { x: 0, y: 0, z: 0 },
  cameraQuaternion = { x: 0, y: 0, z: 0 },
  cameraZoom = 2.4,
  uTime = 0.2,
  animate = true,
  uStrength = 1.6,
  uDensity = 1.0,
  uFrequency,
  uAmplitude,
  uSpeed = 0.3,
  colors = ['#CC4C6E', '#1980FF', '#99B58F'],
  grain = 'on',
  lightType = 'env',
  envPreset = 'city',
  reflection = 0.1,
  brightness = 1.2,
  loadingCallback,
  axesHelper,
  wireframe,
  shader,
}) => {
  let sceneShader = shaders.defaults[type ?? 'plane'] // default type is plane
  if (shader && shader !== 'defaults') sceneShader = shaders[shader]

  useFrame((state) => {
    state.camera.position.lerp(
      vec.set(cameraPosition.x, cameraPosition.y, cameraPosition.z),
      0.1
    )
  })

  usePostProcessing({ on: postProcessing === 'threejs', grain: grain === 'on' })

  let controlledEnvironment = environment
  if (envPreset)
    controlledEnvironment = (
      <Environment
        preset={envPreset}
        background={true}
        loadingCallback={loadingCallback}
      />
    )
  else loadingCallback?.(100)

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
          uDensity={uDensity}
          uFrequency={uFrequency}
          uAmplitude={uAmplitude}
          uSpeed={uSpeed}
          colors={colors}
          reflection={reflection}
          sceneShader={sceneShader}
          axesHelper={axesHelper}
          wireframe={wireframe}
        />

        {/* <EffectComposer>
        <Noise opacity={0.3} />
      </EffectComposer> */}
      </Suspense>
    </>
  )
}
