import { useSpring } from '@react-spring/core'
import * as React from 'react'
import { useEffect } from 'react'
import {
  dToRArr,
  Gradient,
  PRESETS,
  updateGradientState,
  useQueryState,
} from '../'

export function WireframeOverlay({
  forceZoom = null,
  forceCamPos = null,
  forceRot = null,
  forcePos = null,
  forceScale = 1,
  current,
  setLoadingPercentage = () => void 0,
  initialCurrent,
  hoverState,
}: any) {
  useEffect(() => {
    let gradientURL = PRESETS[current].url
    if (current === initialCurrent && window.location.search)
      gradientURL = window.location.search // use search params at the first load.

    updateGradientState(gradientURL)
    console.log(PRESETS[current].url)

    document.documentElement.classList.add('cutomize')
    return () => {
      document.documentElement.classList.remove('cutomize')
    }
  }, [current])

  // shape
  const [type] = useQueryState('type')
  const [animate] = useQueryState('animate')
  const [uTime] = useQueryState('uTime')
  const [uSpeed] = useQueryState('uSpeed')
  const [uStrength] = useQueryState('uStrength')
  const [uDensity] = useQueryState('uDensity')
  const [uFrequency] = useQueryState('uFrequency')
  const [uAmplitude] = useQueryState('uAmplitude')
  const [positionX] = useQueryState('positionX')
  const [positionY] = useQueryState('positionY')
  const [positionZ] = useQueryState('positionZ')
  const [rotationX] = useQueryState('rotationX')
  const [rotationY] = useQueryState('rotationY')
  const [rotationZ] = useQueryState('rotationZ')

  // effects
  const [grain] = useQueryState('grain')
  const [lightType] = useQueryState('lightType')
  const [envPreset] = useQueryState('envPreset')
  const [reflection] = useQueryState('reflection')
  const [brightness] = useQueryState('brightness')

  // camera
  const [cameraZoom] = useQueryState('cameraZoom')
  const [cameraPositionX] = useQueryState('cameraPositionX')
  const [cameraPositionY] = useQueryState('cameraPositionY')
  const [cameraPositionZ] = useQueryState('cameraPositionZ')

  const [embedMode] = useQueryState('embedMode')

  // shader
  const [shader] = useQueryState('shader')

  // force props
  const { animatedScale } = useSpring({ animatedScale: forceScale })
  const { animatedRotation } = useSpring({
    animatedRotation: dToRArr(forceRot || [rotationX, rotationY, rotationZ]),
  })
  const { animatedPosition } = useSpring({
    animatedPosition: forcePos || [positionX, positionY, positionZ],
  })

  // for only website
  const responsiveCameraZoom = getResponsiveZoom(cameraZoom)

  return (
    <Gradient
      // @ts-ignore
      rotation={animatedRotation}
      // rotation={[rotationX, rotationY, rotationZ]}
      position={animatedPosition}
      scale={animatedScale}
      cameraPosition={
        forceCamPos || {
          x: cameraPositionX,
          y: cameraPositionY,
          z: cameraPositionZ,
        }
      }
      cameraRotation={{ x: 0, y: 0, z: 0 }}
      type={type}
      animate={animate === 'on'}
      cameraZoom={forceZoom !== null ? forceZoom : responsiveCameraZoom}
      uTime={uTime}
      uStrength={uStrength}
      uDensity={uDensity}
      uFrequency={uFrequency}
      uAmplitude={uAmplitude}
      uSpeed={uSpeed}
      colors={['#ffffff', '#ffffff', '#ffffff']}
      grain={grain}
      lightType={'3d'}
      envPreset={envPreset}
      reflection={reflection}
      brightness={0.1}
      postProcessing={null} // turn on postpocessing
      loadingCallback={setLoadingPercentage}
      shader={shader}
      axesHelper={false}
      wireframe={true}
      meshCount={96}
      visible={hoverState !== 0 ? true : false}
    />
  )
}

function getResponsiveZoom(cameraZoom: number) {
  if (typeof window !== 'undefined') {
    // browser code
    const type = window.innerWidth >= window.innerHeight ? 'width' : 'height'

    if (type === 'width') return cameraZoom * (window.innerWidth / 1440)
    else return cameraZoom * (window.innerHeight / 900)
  } else return cameraZoom
}
