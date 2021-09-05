import { Environment, PerspectiveCamera } from "@react-three/drei"
import { Camera, Euler, useFrame, useThree } from "@react-three/fiber"
import * as React from "react"
import { Suspense } from "react"
import { usePostProcessing } from "../../hooks/use-post-processing"
import { GradientMesh } from "./GradientMesh"
import * as THREE from "three"

export type GradientPropsT = {
  r3f?: boolean
  postProcessing?: "threejs" | "r3f"
  environment?: any
  lights?: any
  rotation?: Euler | undefined
  cameraPosition?: { x: number; y: number; z: number }
  cameraRotation?: { x: number; y: number; z: number }
  cameraQuaternion?: { x: number; y: number; z: number }
}

export const Gradient: React.FC<GradientPropsT> = ({
  r3f,
  postProcessing = "threejs",
  environment = <Environment preset="lobby" background={true} />,
  lights = <ambientLight intensity={0.3} />,
  rotation = [Math.PI * 2, 0, 0] ,
  cameraPosition = { x: 0, y: 0, z: 0 },
  cameraRotation = { x: 0, y: 0, z: 0 },
  cameraQuaternion = { x: 0, y: 0, z: 0 },
}) => {
  const { camera }: { camera: Camera } = useThree()
  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z)
  camera.rotation.set(cameraRotation.x, cameraRotation.y, cameraRotation.z)
  camera.quaternion.setFromEuler(new THREE.Euler(cameraQuaternion.x, cameraQuaternion.y, cameraQuaternion.z))

  usePostProcessing({ on: postProcessing === "threejs" })

  return (
    <Suspense fallback={"Loading..."}>
      {environment}
      {lights}
        <GradientMesh rotation={rotation} />

      {/* <EffectComposer>
        <Noise opacity={0.3} />
      </EffectComposer> */}
    </Suspense>
  )
}
