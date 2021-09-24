import { Environment, OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import * as React from "react"
import { useContext } from "react"
import { Gradient } from "shadergradient"
import { FormContext } from "../helpers/form-provider"

export function GradientScene() {
  const ctx: any = useContext(FormContext)
  const {
    type,
    animate,
    movements,
    speed,
    bumpScale,
    rotationX,
    rotationY,
    rotationZ,
    cameraPositionX,
    cameraPositionY,
    cameraPositionZ,
    cameraQuaternionX,
    cameraQuaternionY,
    cameraQuaternionZ,
    cameraZoom,
  }: any = ctx?.watch()

  return (
    <Canvas
      style={{
        height: 304,
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
        environment={<Environment preset="city" />}
        rotation={[
          (rotationX / 360) * Math.PI,
          (rotationY / 360) * Math.PI,
          (rotationZ / 360) * Math.PI,
        ]}
        cameraPosition={{
          x: cameraPositionX,
          y: cameraPositionY,
          z: cameraPositionZ,
        }}
        cameraRotation={{ x: 0, y: 0, z: 0 }}
        cameraQuaternion={{
          x: cameraQuaternionX,
          y: cameraQuaternionY,
          z: cameraQuaternionZ,
        }}
        type={type}
        animate={animate === "on"}
        cameraZoom={cameraZoom}
        uTime={movements}
        // postProcessing={postProcessing}
      />
    </Canvas>
  )
}

GradientScene.defaultProps = {}
