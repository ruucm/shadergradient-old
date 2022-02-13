import * as React from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { GizmoHelper, GizmoViewport } from '@react-three/drei'
import {
  useQueryState,
  dToR,
  canvasProps,
  usePropertyStore,
} from '../../../dist'
import CameraControls from 'camera-controls'
import * as THREE from 'three'
import { useEffect, useRef } from 'react'

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
  const hoverState = usePropertyStore((state: any) => state.hoverState)
  const toggleZoom = usePropertyStore((state: any) => state.toggleZoom)

  useEffect(() => {
    const control = ref.current
    if (control && hoverState === 0 && toggleZoom === false) {
      control.rotateTo(dToR(cAzimuthAngle), dToR(cPolarAngle), true)
      control.dollyTo(cDistance, true)
      control.zoomTo(cameraZoom, true)
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

  // @ts-ignore
  return <cameraControls ref={ref} args={[camera, gl.domElement]} />
}

export function LCanvas({ children }) {
  // performance
  const [pixelDensity] = useQueryState('pixelDensity')

  const toggleAxis = usePropertyStore((state: any) => state.toggleAxis)

  return (
    <Canvas
      style={{ height: 304 }}
      gl={{ preserveDrawingBuffer: true }} // to capture the canvas
      id='r3f-canvas'
      {...canvasProps(pixelDensity)}
    >
      <LControl />
      {toggleAxis === true && (
        <GizmoHelper
          alignment='bottom-right' // widget alignment within scene
          margin={[30, 30]} // widget margins (X, Y)
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

      {children}
    </Canvas>
  )
}
