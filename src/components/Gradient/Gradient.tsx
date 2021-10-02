import { Environment, PerspectiveCamera } from "@react-three/drei"
import { Camera, Euler, useFrame, useThree } from "@react-three/fiber"
import * as React from "react"
import { Suspense } from "react"
import { usePostProcessing } from "../../hooks/use-post-processing"
import { GradientMesh } from "./GradientMesh"
import * as THREE from "three"

export type GradientPropsT = {
  r3f?: boolean
  type?: "plane" | "sphere" | "waterPlane"
  postProcessing?: "threejs" | "r3f"
  environment?: any
  lights?: any
  rotation?: Euler | undefined
  cameraPosition?: { x: number; y: number; z: number }
  cameraRotation?: { x: number; y: number; z: number }
  cameraQuaternion?: { x: number; y: number; z: number }
  cameraZoom?: number
  uTime?: number
  animate?: boolean
  uStrength?: number
  uSpeed?: number
  colors?: string[]
  grain?: "on" | "off"
}

export const Gradient: React.FC<GradientPropsT> = ({
  r3f,
  type = "plane",
  postProcessing = "threejs",
  environment = <Environment preset="lobby" background={true} />,
  lights = <ambientLight intensity={0.3} />,
  rotation = [Math.PI * 2, 0, 0],
  cameraPosition = { x: 0, y: 0, z: 0 },
  cameraRotation = { x: 0, y: 0, z: 0 },
  cameraQuaternion = { x: 0, y: 0, z: 0 },
  cameraZoom = 1,
  uTime = 0.2,
  animate = false,
  uStrength = 1.3,
  uSpeed = 0.3,
  colors = ["#CC4C6E", "#1980FF", "#99B58F"],
  grain,
}) => {
  const { camera }: { camera: Camera } = useThree()
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
  camera.rotation.set(cameraRotation.x, cameraRotation.y, cameraRotation.z) // this one weirldy not works.
  camera.quaternion.setFromEuler(
    new THREE.Euler(cameraQuaternion.x, cameraQuaternion.y, cameraQuaternion.z)
  )
  camera.zoom = cameraZoom
  camera.updateProjectionMatrix() // need to update camera's zoom

  usePostProcessing({ on: postProcessing === "threejs", grain: grain === "on" })

  return (
    <Suspense fallback={"Loading..."}>
      {environment}
      {lights}
      <GradientMesh
        key={colors.toString()}
        type={type}
        rotation={rotation}
        animate={animate}
        uTime={uTime}
        uStrength={uStrength}
        uSpeed={uSpeed}
        colors={colors}
      />

      {/* <EffectComposer>
        <Noise opacity={0.3} />
      </EffectComposer> */}
    </Suspense>
  )
}
