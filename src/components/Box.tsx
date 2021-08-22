import * as THREE from "three"
import * as React from "react"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"

export const Box = ({ r3f }: any) => {
  // This reference will give us direct access to the THREE.Mesh object
  const mesh: any = useRef(null)
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) =>
    mesh.current
      ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.01)
      : null
  )
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      ref={mesh}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  )
}


