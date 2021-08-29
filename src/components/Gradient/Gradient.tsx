import { Environment } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import * as React from "react"
import { Suspense } from "react"
import { usePostProcessing } from "../../hooks/use-post-processing"
import { GradientMesh } from "./GradientMesh"
import { EffectComposer, Noise } from "@react-three/postprocessing"

export type GradientPropsT = {
  r3f?: boolean
  type?: "plane" | "sphere" | "waterPlane"
  postProcessing?: "threejs" | "r3f"
  environment?: any
  lights?: any
}

export const Gradient: React.FC<GradientPropsT> = ({
  r3f,
  type = "plane",
  postProcessing = "threejs",
  environment = <Environment preset="lobby" background={true} />,
  lights = <ambientLight intensity={0.3} />,
}) => {
  const { camera } = useThree()
  // scene.background = new THREE.Color(0x000000)
  camera.position.set(2, 4, 1)

  usePostProcessing({ on: postProcessing === "threejs" })

  return (
    <Suspense fallback={"Loading..."}>
      {environment}
      {lights}
      <GradientMesh type={type} />

      {postProcessing === "r3f" && (
        <EffectComposer>
          <Noise opacity={0.3} />
        </EffectComposer>
      )}
    </Suspense>
  )
}
