import { useEffect, useRef } from 'react'
import { dToR, usePropertyStore, useQueryState } from '../../'

export function useCameraAnimation() {
  const ref: any = useRef()

  // useFrame((state, delta) => ref.current.update(delta))

  const [cAzimuthAngle] = useQueryState('cAzimuthAngle')
  const [cPolarAngle] = useQueryState('cPolarAngle')
  const [cDistance] = useQueryState('cDistance')
  const [cameraZoom] = useQueryState('cameraZoom')

  const hoverState = usePropertyStore((state: any) => state.hoverState)
  const toggleZoom = usePropertyStore((state: any) => state.toggleZoom)

  const [type] = useQueryState('type')

  useEffect(() => {
    const control = ref.current

    // basic camera animations
    if (control && hoverState === 0 && toggleZoom === false) {
      control.rotateTo(dToR(cAzimuthAngle), dToR(cPolarAngle), true)
      if (type === 'sphere') control.zoomTo(cameraZoom, true)
      else control.dollyTo(cDistance, true)
    } else if (hoverState !== 0 || toggleZoom === true) {
      control.dollyTo(20, true)
    }

    // reset dolly & zoom for each types
    if (type === 'sphere') control.dollyTo(10, true)
    else control.zoomTo(1, true)
  }, [
    ref,
    cAzimuthAngle,
    cPolarAngle,
    cDistance,
    cameraZoom,
    hoverState,
    toggleZoom,
    type,
  ])

  return ref
}
