import { useEffect, useState } from 'react'
import { Gradient, useQueryState, updateGradientState } from 'shadergradient'
import PRESETS from '../../../pages/presets.json'
import { useUIStore } from '@/helpers/store'
import { useSpring } from '@react-spring/core'
import { dToRArr } from '@/utils'

export function GradientScene({
  r3f,
  forceZoom = null,
  forceCamPos = null,
  forceRot = null,
  forcePos = null,
  forceScale = 1,
}) {
  const current = useUIStore((state: any) => state.current)
  const setLoadingPercentage = useUIStore(
    (state: any) => state.setLoadingPercentage
  )

  useEffect(() => {
    let gradientURL = PRESETS[current].url
    if (current === 1) gradientURL = window.location.search // use search params at the first load.

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
  const [positionX] = useQueryState('positionX')
  const [positionY] = useQueryState('positionY')
  const [positionZ] = useQueryState('positionZ')
  const [rotationX] = useQueryState('rotationX')
  const [rotationY] = useQueryState('rotationY')
  const [rotationZ] = useQueryState('rotationZ')

  // colors
  const [color1] = useQueryState('color1')
  const [color2] = useQueryState('color2')
  const [color3] = useQueryState('color3')

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
  const responsiveCameraZoom =
    embedMode === 'on' ? cameraZoom : cameraZoom * (window.innerWidth / 1440)

  // force props
  const { animatedScale } = useSpring({ animatedScale: forceScale })
  const { animatedRotation } = useSpring({
    animatedRotation: dToRArr(forceRot || [rotationX, rotationY, rotationZ]),
  })
  const { animatedPosition } = useSpring({
    animatedPosition: forcePos || [positionX, positionY, positionZ],
  })

  return (
    <Gradient
      rotation={animatedRotation}
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
      uSpeed={uSpeed}
      colors={[color1, color2, color3]}
      grain={grain}
      lightType={lightType}
      envPreset={envPreset}
      reflection={reflection}
      brightness={brightness}
      postProcessing={'threejs'} // turn on postpocessing
      loadingCallback={setLoadingPercentage}
    />
  )
}
