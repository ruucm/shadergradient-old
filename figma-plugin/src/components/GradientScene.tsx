import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import * as React from "react"
import { useContext } from "react"
import { Gradient } from "shadergradient"
import { FormContext } from "../helpers/form-provider"

export function GradientScene() {
  const ctx: any = useContext(FormContext)
  const { type, postProcessing }: any = ctx?.watch()

  return (
    <Canvas
      style={{
        height: 500,
      }}
      gl={{ preserveDrawingBuffer: true }} // to capture the canvas
      id="r3f-canvas"
    >
      <OrbitControls />
      <Gradient
        environment={<Environment preset="city" />}
        type={type}
        postProcessing={postProcessing}
      />
    </Canvas>
  )
}

GradientScene.defaultProps = {}
