import * as React from 'react'
import glsl from 'glslify'
import {
  GradientWithQueries,
  usePropertyStore,
  useUIStore,
} from '../../../dist'

// pre import for shaders
export const glslPragmas = `
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d) 
#pragma glslify: snoise3 = require(glsl-noise/simplex/3d) 
#pragma glslify: snoise4 = require(glsl-noise/simplex/4d) 
#pragma glslify: cnoise2 = require(glsl-noise/classic/2d) 
#pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 
#pragma glslify: cnoise4 = require(glsl-noise/classic/4d) 
#pragma glslify: pnoise2 = require(glsl-noise/periodic/2d) 
#pragma glslify: pnoise3 = require(glsl-noise/periodic/3d) 
#pragma glslify: pnoise4 = require(glsl-noise/periodic/4d)

#pragma glslify: halftone = require('glsl-halftone')
#pragma glslify: cookTorranceSpec = require(glsl-specular-cook-torrance) 

#pragma glslify: faceNormals = require('glsl-face-normal')
#pragma glslify: perturb = require('glsl-perturb-normal')
#pragma glslify: computeDiffuse = require('glsl-diffuse-oren-nayar')
#pragma glslify: computeSpecular = require('glsl-specular-phong')
#pragma glslify: toLinear = require('glsl-gamma/in')
#pragma glslify: toGamma = require('glsl-gamma/out')
`
glsl`${glslPragmas}`

export function GradientScene() {
  const activePreset = useUIStore((state) => state.activePreset)
  const hoverState = usePropertyStore((state: any) => state.hoverState)

  return (
    <GradientWithQueries activePreset={activePreset} hoverState={hoverState} />
  )
}
