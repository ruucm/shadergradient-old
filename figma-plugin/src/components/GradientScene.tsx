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
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
      />
      <Gradient
        rotation={[Math.PI / 2, 0, 0]}
        cameraPosition={{
          x: 0,
          y: 2.2,
          z: 0,
        }}
        cameraQuaternion={{
          x: -1.2,
          y: 0,
          z: 0,
        }}
        environment={<Environment preset="city" />}
        type={type}
        postProcessing={postProcessing}
      />
    </Canvas>
  )
}

GradientScene.defaultProps = {}
