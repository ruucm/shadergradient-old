import * as React from 'react'
import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useQueryState, dToR, usePropertyStore } from '../../'

export function LControl() {
  const ref: any = useRef()
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)

  useFrame((state, delta) => ref.current.update(delta))

  const [cAzimuthAngle] = useQueryState('cAzimuthAngle')
  const [cPolarAngle] = useQueryState('cPolarAngle')
  const [cDistance] = useQueryState('cDistance')
  const [cameraZoom] = useQueryState('cameraZoom')
  const [type] = useQueryState('type')

  const hoverState = usePropertyStore((state: any) => state.hoverState)
  const toggleZoom = usePropertyStore((state: any) => state.toggleZoom)

  useEffect(() => {
    const control = ref.current
    if (control && hoverState === 0 && toggleZoom === false) {
      control.rotateTo(dToR(cAzimuthAngle), dToR(cPolarAngle), true)
      if (type === 'sphere') control.zoomTo(cameraZoom, true)
      else control.dollyTo(cDistance, true)
    } else if (hoverState !== 0 || toggleZoom === true) {
      control.dollyTo(20, true)
    }
  }, [
    ref,
    cAzimuthAngle,
    cPolarAngle,
    cDistance,
    cameraZoom,
    hoverState,
    toggleZoom,
  ])

  useEffect(() => {
    const control = ref.current

    // reset dolly & zoom for each types
    if (type === 'sphere') control.dollyTo(10, true)
    else control.zoomTo(1, true)
  }, [type])

  // @ts-ignore
  return <cameraControls ref={ref} args={[camera, gl.domElement]} />
}
