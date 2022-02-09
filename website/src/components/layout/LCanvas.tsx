import { useStore, useUIStore } from '@/helpers/store'
import { Preload, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import {
  useQueryState,
  dToR,
  canvasProps,
  usePropertyStore,
} from '@shadergradient'
import * as THREE from 'three'
import CameraControls from 'camera-controls'

CameraControls.install({ THREE })
extend({ CameraControls })

function LControl() {
  const ref: any = useRef()
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const dom = useStore((state) => state.dom)

  useFrame((state, delta) => ref.current.update(delta))

  const [cAzimuthAngle] = useQueryState('cAzimuthAngle')
  const [cPolarAngle] = useQueryState('cPolarAngle')
  const [cDistance] = useQueryState('cDistance')
  const hoverState = usePropertyStore((state: any) => state.hoverState)
  const toggleZoom = usePropertyStore((state: any) => state.toggleZoom)

  useEffect(() => {
    if (ref) dom.current.style['touch-action'] = 'none'
  }, [dom, ref])

  useEffect(() => {
    const control = ref.current
    console.log(control)
    if (control && hoverState === 0 && toggleZoom === false) {
      control.rotateTo(dToR(cAzimuthAngle), dToR(cPolarAngle), true)
      control.dollyTo(cDistance, true)
    } else if (hoverState !== 0 || toggleZoom === true) {
      control.dollyTo(20, true)
    }
  }, [ref, cAzimuthAngle, cPolarAngle, cDistance, hoverState, toggleZoom])

  // @ts-ignore
  return <cameraControls ref={ref} args={[camera, gl.domElement]} />
}

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  // performance
  const [pixelDensity] = useQueryState('pixelDensity')

  const toggleAxis = usePropertyStore((state: any) => state.toggleAxis)

  return (
    <Canvas
      id='gradientCanvas'
      className='absolute top-0'
      onCreated={(state) => state.events.connect(dom.current)}
      {...canvasProps(pixelDensity)}
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

export default LCanvas
