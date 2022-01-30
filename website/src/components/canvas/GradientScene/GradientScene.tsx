import { useEffect, useState } from "react"
import {
  Gradient,
  useQueryState,
  updateGradientState,
  PRESETS,
} from "shadergradient"
import { useUIStore } from "@/helpers/store"
import { useSpring } from "@react-spring/core"
import { dToRArr } from "@/utils"
import { initialCurrent } from "@/consts"

import glsl from "glslify"
import vertexShaderGrad from "./shaders/vertexShaderGrad.glsl"
import fragmentShaderGrad from "./shaders/fragmentShaderGrad.glsl"
import * as shaders from "./shaders"

const glslPragmas = `
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

export function GradientScene({
  r3f,
  forceZoom = null,
  forceCamPos = null,
  forceRot = null,
  forcePos = null,
  forceScale = 1,
}) {
  const current = useUIStore((state: any) => state.current)
  const setLoadingPercentage = useUIStore(
    (state: any) => state.setLoadingPercentage
  )
  const hoverState = useUIStore((state: any) => state.hoverState)

  useEffect(() => {
    let gradientURL = PRESETS[current].url
    if (current === initialCurrent && window.location.search)
      gradientURL = window.location.search // use search params at the first load.

    updateGradientState(gradientURL)
    console.log(PRESETS[current].url)

    document.documentElement.classList.add("cutomize")
    return () => {
      document.documentElement.classList.remove("cutomize")
    }
  }, [current])

  // shape
  const [type] = useQueryState("type")
  const [animate] = useQueryState("animate")
  const [uTime] = useQueryState("uTime")
  const [uSpeed] = useQueryState("uSpeed")
  const [uStrength] = useQueryState("uStrength")
  const [uDensity] = useQueryState("uDensity")
  const [positionX] = useQueryState("positionX")
  const [positionY] = useQueryState("positionY")
  const [positionZ] = useQueryState("positionZ")
  const [rotationX] = useQueryState("rotationX")
  const [rotationY] = useQueryState("rotationY")
  const [rotationZ] = useQueryState("rotationZ")

  // colors
  const [color1] = useQueryState("color1")
  const [color2] = useQueryState("color2")
  const [color3] = useQueryState("color3")
  const hoverStateColor = getHoverColor(hoverState, [color1, color2, color3])

  // effects
  const [grain] = useQueryState("grain")
  const [lightType] = useQueryState("lightType")
  const [envPreset] = useQueryState("envPreset")
  const [reflection] = useQueryState("reflection")
  const [brightness] = useQueryState("brightness")

  // camera
  const [cameraZoom] = useQueryState("cameraZoom")
  const [cameraPositionX] = useQueryState("cameraPositionX")
  const [cameraPositionY] = useQueryState("cameraPositionY")
  const [cameraPositionZ] = useQueryState("cameraPositionZ")

  const [embedMode] = useQueryState("embedMode")
  const [axesHelper] = useQueryState("axesHelper")
  const [wireframe] = useQueryState("wireframe")

  const responsiveCameraZoom = getResponsiveZoom(cameraZoom)

  // shader
  const [shader] = useQueryState("shader")

  // force props
  const { animatedScale } = useSpring({ animatedScale: forceScale })
  const { animatedRotation } = useSpring({
    animatedRotation: dToRArr(forceRot || [rotationX, rotationY, rotationZ]),
  })
  const { animatedPosition } = useSpring({
    animatedPosition: forcePos || [positionX, positionY, positionZ],
  })

  return (
    <Gradient
      // @ts-ignore
      rotation={animatedRotation}
      // rotation={[rotationX, rotationY, rotationZ]}
      position={animatedPosition}
      scale={animatedScale}
      cameraPosition={
        forceCamPos || {
          x: cameraPositionX,
          y: cameraPositionY,
          z: cameraPositionZ,
        }
      }
      cameraRotation={{ x: 0, y: 0, z: 0 }}
      type={type}
      animate={animate === "on"}
      cameraZoom={forceZoom !== null ? forceZoom : responsiveCameraZoom}
      uTime={uTime}
      uStrength={uStrength}
      uDensity={uDensity}
      uSpeed={uSpeed}
      colors={hoverStateColor}
      grain={grain}
      lightType={lightType}
      envPreset={envPreset}
      reflection={reflection}
      brightness={brightness}
      postProcessing={"threejs"} // turn on postpocessing
      loadingCallback={setLoadingPercentage}
      vertexShader={
        type === "sphere" ? shaders[shader]?.vertexShader : vertexShaderGrad
      }
      fragmentShader={
        type === "sphere" ? shaders[shader]?.fragmentShader : fragmentShaderGrad
      }
      axesHelper={axesHelper === "on"}
      wireframe={wireframe === "enable"}
    />
  )
}

function getResponsiveZoom(cameraZoom: number) {
  const type = window.innerWidth >= window.innerHeight ? "width" : "height"

  if (type === "width") return cameraZoom * (window.innerWidth / 1440)
  else return cameraZoom * (window.innerHeight / 900)
}

function getHoverColor(hoverState: number, colors) {
  if (hoverState === 0) return [colors[0], colors[1], colors[2]]
  else if (hoverState === 1) return [colors[0], "#000000", "#000000"]
  else if (hoverState === 2) return ["#000000", colors[1], "#000000"]
  else if (hoverState === 3) return ["#000000", "#000000", colors[2]]
}
