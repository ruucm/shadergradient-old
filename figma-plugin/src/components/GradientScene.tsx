import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import * as React from "react"
import { useContext } from "react"
import { Gradient } from "shadergradient"
import { FormContext } from "../helpers/form-provider"

export function GradientScene() {
  const ctx: any = useContext(FormContext)
  const { type, env, postProcessing } = ctx?.watch()

  return (
    <Canvas
      style={{
        position: "absolute",
        top: 0,
        background: "blue",
      }}
      gl={{ preserveDrawingBuffer: true }} // to capture the canvas
      id="3d-canvas"
    >
      {/* @ts-ignore */}
      <OrbitControls />
      <Gradient environment={<Environment preset="city" />} type={type} />
    </Canvas>
  )
}

GradientScene.defaultProps = {}
