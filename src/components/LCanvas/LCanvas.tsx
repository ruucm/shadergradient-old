import * as React from 'react'
import { Preload, GizmoHelper, GizmoViewport } from '@react-three/drei'
import { Canvas, extend } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import * as THREE from 'three'
import {
  useQueryState,
  canvasProps,
  usePropertyStore,
  useDomStore,
} from '../../'
import { LControl } from './LControl'

CameraControls.install({ THREE })
extend({ CameraControls })

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
