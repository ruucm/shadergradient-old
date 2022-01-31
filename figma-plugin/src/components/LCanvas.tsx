import * as React from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import {
  Gradient,
  updateGradientState,
  useQueryState,
  PRESETS,
  dToR,
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

  useEffect(() => {
    const control = ref.current
    if (control) {
      control.rotateTo(dToR(cAzimuthAngle), dToR(cPolarAngle), true)
      control.dollyTo(cDistance, true)
    }
  }, [ref, cAzimuthAngle, cPolarAngle, cDistance])

  // @ts-ignore
  return <cameraControls ref={ref} args={[camera, gl.domElement]} />
}

export function LCanvas({ children }) {
  // performance
  const [pixelDensity] = useQueryState('pixelDensity')

  return (
    <Canvas
      style={{ height: 304 }}
      gl={{ preserveDrawingBuffer: true }} // to capture the canvas
      id='r3f-canvas'
      dpr={pixelDensity}
      linear={true} //sRGBEncoding
      flat={true} //ACESFilmicToneMapping
    >
      <LControl />
      {children}
    </Canvas>
  )
}
