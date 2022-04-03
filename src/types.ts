import * as React from 'react'
import type { Vector3, Euler } from '@react-three/fiber'

export interface gradientMeshT {
  type: 'plane' | 'sphere' | 'waterPlane'
  position?: Vector3
  rotation?: Euler
  scale?: Vector3

  // material properties
  uTime?: number
  uStrength?: number
  uDensity?: number
  uFrequency?: number
  uAmplitude?: number
  uSpeed?: number
  reflection?: number
  wireframe?: boolean
  colors?: { value: string[] } | string[]

  animate?: boolean
  visible?: boolean

  // shader (customable)
  sceneShader?: { vertex: string; fragment: string }

  // toolbar
  axesHelper?: boolean

  // hover effect
  hoverState?: number
}

export interface gradientT extends gradientMeshT {
  shader?: string
  cameraPosition?: { x: number; y: number; z: number }

  lightType?: '3d' | 'env'
  lights?: React.ReactNode
  brightness?: number

  environment?: React.ReactNode
  envPreset?: 'city' | 'dawn' | 'lobby'

  grain?: 'on' | 'off'

  loadingCallback?: (percentage: number) => void
}

export type gradientWithQueryT = {
  toggleZoom?: boolean

  forcePos?: Vector3
  forceCamPos?: { x: number; y: number; z: number }
  forceScale?: number
}

export const defaultProps: { GradientMesh: gradientMeshT } = {
  GradientMesh: {
    type: 'plane',
  },
}
