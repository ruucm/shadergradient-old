import { useStore, useUIStore } from '@/helpers/store'
import { Preload, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { useQueryState, dToR } from '@shadergradient'
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
  const hoverState = useUIStore((state: any) => state.hoverState)

  useEffect(() => {
    if (ref) dom.current.style['touch-action'] = 'none'
  }, [dom, ref])

  useEffect(() => {
    const control = ref.current
    if (control && hoverState === 0) {
      control.rotateTo(dToR(cAzimuthAngle), dToR(cPolarAngle), true)
      control.dollyTo(cDistance, true)
    } else if (hoverState !== 0) {
      control.dollyTo(30, true)
    }
  }, [ref, cAzimuthAngle, cPolarAngle, cDistance, hoverState])

  // @ts-ignore
  return <cameraControls ref={ref} args={[camera, gl.domElement]} />
}

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)

  // performance
  const [pixelDensity] = useQueryState('pixelDensity')
  const [gizmoHelper] = useQueryState('gizmoHelper', 'show')

  return (
    <Canvas
      id='gradientCanvas'
      mode='concurrent'
      camera={{
        fov: 45,
      }}
      dpr={pixelDensity} //device pixel ratio - 1 default and fast, 2 detailed and slow
      linear={true} //sRGBEncoding
      flat={true} //ACESFilmicToneMapping
      className='absolute top-0'
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <LControl />
      {gizmoHelper === 'show' && (
        <GizmoHelper
          alignment='bottom-right' // widget alignment within scene
          margin={[65, 110]} // widget margins (X, Y)
          renderPriority={2}
        >
          <GizmoViewport
            axisColors={['white', 'white', 'white']}
            labelColor='grey'
            hideNegativeAxes
            // @ts-ignore
            axisHeadScale={0.8}
          />
          {/* alternative: <GizmoViewcube /> */}
        </GizmoHelper>
      )}

      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
