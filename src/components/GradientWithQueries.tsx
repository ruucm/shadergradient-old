import * as React from 'react'
import { useEffect } from 'react'
import {
  Gradient,
  initialActivePreset,
  PRESETS,
  updateGradientState,
  usePropertyStore,
  useQueryState,
  useUIStore,
} from '../'
import { gradientWithQueryT } from '@/types'

/**
 * Query(Web) wrapper for the Gradient component
 */
export const GradientWithQueries: React.FC<gradientWithQueryT> = ({
  toggleZoom = false,

  forceCamPos = null,
  forcePos = null,
  forceScale = 1,
}) => {
  const activePreset = useUIStore((state: any) => state.activePreset)
  const setLoadingPercentage = useUIStore(
    (state: any) => state.setLoadingPercentage
  )
  useEffect(() => {
    let gradientURL = PRESETS[activePreset].url
    if (activePreset === initialActivePreset && window.location.search)
      gradientURL = window.location.search // use search params at the first load.

    updateGradientState(gradientURL)

    document.documentElement.classList.add('cutomize')
    return () => {
      document.documentElement.classList.remove('cutomize')
    }
  }, [activePreset])

  // zoom out (toogleZoom) on aboutPage
  useEffect(() => usePropertyStore.setState({ toggleZoom }), [toggleZoom])

  const hoverState = usePropertyStore((state: any) => state.hoverState)
  const toggleAxis = usePropertyStore((state: any) => state.toggleAxis)

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

  // colors
  const [color1] = useQueryState('color1')
  const [color2] = useQueryState('color2')
  const [color3] = useQueryState('color3')
  const hoverStateColor = getHoverColor(hoverState, [color1, color2, color3])

  // effects
  const [grain] = useQueryState('grain')
  const [lightType] = useQueryState('lightType')
  const [envPreset] = useQueryState('envPreset')
  const [reflection] = useQueryState('reflection')
  const [brightness] = useQueryState('brightness')

  // camera
  const [cameraPositionX] = useQueryState('cameraPositionX')
  const [cameraPositionY] = useQueryState('cameraPositionY')
  const [cameraPositionZ] = useQueryState('cameraPositionZ')

  const [wireframe] = useQueryState('wireframe')

  // shader
  const [shader] = useQueryState('shader')

  return (
    <Gradient
      rotation={[rotationX, rotationY, rotationZ]}
      position={forcePos || [positionX, positionY, positionZ]}
      scale={forceScale}
      cameraPosition={
        forceCamPos || {
          x: cameraPositionX,
          y: cameraPositionY,
          z: cameraPositionZ,
        }
      }
      type={type}
      animate={animate === 'on'}
      uTime={uTime}
      uStrength={uStrength}
      uDensity={uDensity}
      uFrequency={uFrequency}
      uAmplitude={uAmplitude}
      uSpeed={uSpeed}
      colors={hoverStateColor}
      grain={grain}
      lightType={lightType}
      envPreset={envPreset}
      reflection={reflection}
      brightness={brightness}
      loadingCallback={setLoadingPercentage}
      shader={shader}
      axesHelper={toggleAxis}
      wireframe={wireframe === 'enable'}
      visible={true}
      hoverState={hoverState}
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

function getHoverColor(hoverState: number, colors: any) {
  if (hoverState === 1) return [colors[0], '#000000', '#000000']
  else if (hoverState === 2) return ['#000000', colors[1], '#000000']
  else if (hoverState === 3) return ['#000000', '#000000', colors[2]]
  else return [colors[0], colors[1], colors[2]]
}
