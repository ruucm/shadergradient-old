import * as React from 'react'
import { Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { usePostProcessing } from '../../hooks/use-post-processing'
import { GradientMesh } from './comps/GradientMesh'
import * as shaders from './shaders'
import { Environment } from '@/lib/Environment'
import { gradientT } from '@/types'

const vec = new THREE.Vector3()

export const Gradient: React.FC<gradientT> = ({
  // gradientMeshT
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

  axesHelper,
  hoverState,

  // gradientT
  shader,
  cameraPosition = { x: 0.4, y: -0.2, z: -5 }, // could be replaced by 'camera-controls'

  lightType = 'env',
  lights = <ambientLight intensity={1} />,
  brightness = 1.2,

  environment = <Environment preset='lobby' background={true} />,
  envPreset = 'city',

  grain = 'on',

  loadingCallback,
}) => {
  let sceneShader = shaders.defaults[type ?? 'plane'] // default type is plane
  if (shader && shader !== 'defaults') sceneShader = shaders[shader]

  useFrame((state) => {
    state.camera.position.lerp(
      vec.set(cameraPosition.x, cameraPosition.y, cameraPosition.z),
      0.1
    )
  })

  usePostProcessing({ on: true, grain: grain === 'on' })

  let controlledEnvironment = environment
  if (envPreset)
    controlledEnvironment = (
      <Environment
        // preset={envPreset}
        files={`https://www.shadergradient.com/hdr/${envPreset}.hdr`} // use instead of preset, cause rawCdn is not stable on many requests.
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
          visible={visible}
          hoverState={hoverState}
        />
      </Suspense>
    </>
  )
}
