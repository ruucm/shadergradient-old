import { useSpring } from '@react-spring/core'
import * as React from 'react'
import { useEffect } from 'react'
import {
  dToRArr,
  Gradient,
  PRESETS,
  updateGradientState,
  usePropertyStore,
  useQueryState,
} from '../'

export function GradientWithQueries({
  forceZoom = null,
  forceCamPos = null,
  forceRot = null,
  forcePos = null,
  forceScale = 1,
  current,
  setLoadingPercentage = () => void 0,
  initialCurrent,
  hoverState = 0,
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
  const [cameraZoom] = useQueryState('cameraZoom')
  const [cameraPositionX] = useQueryState('cameraPositionX')
  const [cameraPositionY] = useQueryState('cameraPositionY')
  const [cameraPositionZ] = useQueryState('cameraPositionZ')

  const [embedMode] = useQueryState('embedMode')
  const [wireframe] = useQueryState('wireframe')
  const toggleAxis = usePropertyStore((state: any) => state.toggleAxis)

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
    <>
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
        colors={hoverStateColor}
        grain={grain}
        lightType={lightType}
        envPreset={envPreset}
        reflection={reflection}
        brightness={brightness}
        postProcessing={'threejs'} // turn on postpocessing
        loadingCallback={setLoadingPercentage}
        shader={shader}
        axesHelper={toggleAxis}
        wireframe={wireframe === 'enable'}
        meshCount={192}
        visible={true}
      />

      {/* for wireframe */}
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
    </>
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
