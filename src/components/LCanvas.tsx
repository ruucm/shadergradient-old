import { useEffect, useRef } from 'react'
import * as React from 'react'
import { Preload, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import * as THREE from 'three'
import {
  useQueryState,
  dToR,
  canvasProps,
  usePropertyStore,
  useDomStore,
} from '..'

CameraControls.install({ THREE })
extend({ CameraControls })

function LControl() {
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

export const LCanvas = ({ children, ...rest }) => {
  const dom = useDomStore((state) => state.dom)

  // performance
  const [pixelDensity] = useQueryState('pixelDensity')

  const toggleAxis = usePropertyStore((state: any) => state.toggleAxis)

  return (
    <Canvas
      id='gradientCanvas'
      onCreated={(state) => state.events.connect(dom.current)}
      {...canvasProps(pixelDensity)}
      {...rest}
    >
      <LControl />
      {toggleAxis === true && (
        <GizmoHelper
          alignment='bottom-right' // widget alignment within scene
          margin={[65, 110]} // widget margins (X, Y)
          renderPriority={2}
        >
          <GizmoViewport
            axisColors={['white', 'white', 'white']}
            labelColor='darkgrey'
            hideNegativeAxes
            // @ts-ignore
            axisHeadScale={0.8}
          />
        </GizmoHelper>
      )}

      <Preload all />
      {children}
    </Canvas>
  )
}
