import * as React from 'react'
import { useThree, extend } from '@react-three/fiber'
import CameraControls from 'camera-controls'
import * as THREE from 'three'
import { useCameraAnimation } from './useCameraAnimation'

CameraControls.install({ THREE })
extend({ CameraControls })

export function LControl() {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)

  const ref = useCameraAnimation()

  return <cameraControls ref={ref} args={[camera, gl.domElement]} />
}
