import { updateGradientState, useUIStore } from '@/helpers/store'
import useQueryState from '@/hooks/useQueryState'
import { useEffect } from 'react'
import { Gradient } from 'shadergradient'
import PRESETS from '../../../pages/presets.json'

export function LazyGradient({
  r3f,
  loaded = true,
  forceZoom = null,
  forceCamPos = null,
  forceRot = null,
}) {
  const current = useUIStore((state: any) => state.current)

  useEffect(() => {
    // update Gradient if there are query params (history nav)
    const gradientURL =
      current === 0 && window.location.search
        ? window.location.search
        : PRESETS[current].url
    updateGradientState(gradientURL)

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

  console.log('grain', grain)

  return (
    <>
      {loaded && (
        <Gradient
          r3f
          rotation={
            forceRot !== null
              ? forceRot
              : [
                  (rotationX / 360) * Math.PI,
                  (rotationY / 360) * Math.PI,
                  (rotationZ / 360) * Math.PI,
                ]
          }
          cameraPosition={
            forceCamPos !== null
              ? forceCamPos
              : {
                  x: cameraPositionX,
                  y: cameraPositionY,
                  z: cameraPositionZ,
                }
          }
          cameraRotation={{ x: 0, y: 0, z: 0 }}
          type={type}
          animate={animate === 'on'}
          cameraZoom={forceZoom !== null ? forceZoom : cameraZoom}
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
        />
      )}
    </>
  )
}

LazyGradient.defaultProps = {}
