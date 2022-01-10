import { useStore } from "@/helpers/store"
import { A11yUserPreferences } from "@react-three/a11y"
import {
  OrbitControls,
  Preload,
  useContextBridge,
  GizmoHelper,
  GizmoViewport,
} from "@react-three/drei"
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { FormContext } from "../../helpers/form-provider"
import { useQueryState } from "shadergradient"
import * as THREE from "three"
import CameraControls from "camera-controls"
import { dToR } from "@/utils"

CameraControls.install({ THREE })
extend({ CameraControls })

function Controls() {
  const ref: any = useRef()
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const dom = useStore((state) => state.dom)

  useFrame((state, delta) => ref.current.update(delta))

  const [azimuthAngle] = useQueryState("azimuthAngle")
  const [polarAngle] = useQueryState("polarAngle")

  useEffect(() => {
    if (ref) dom.current.style["touch-action"] = "none"
  }, [dom, ref])

  useEffect(() => {
    const control = ref.current
    if (control) control.rotateTo(dToR(azimuthAngle), dToR(polarAngle), true)
  }, [ref, azimuthAngle, polarAngle])

  // @ts-ignore
  return <cameraControls ref={ref} args={[camera, gl.domElement]} />
}

const LCanvas = ({ children }) => {
  const dom = useStore((state) => state.dom)
  const ContextBridge = useContextBridge(FormContext)

  // performance
  const [pixelDensity] = useQueryState("pixelDensity")

  //hide gizmoHelper on Embedmode
  const [embedMode] = useQueryState("embedMode")

  return (
    <Canvas
      id="gradientCanvas"
      mode="concurrent"
      className="absolute top-0"
      camera={{
        fov: 45,
      }}
      dpr={pixelDensity} //device pixel ratio - 1 default and fast, 2 detailed and slow
      linear={true} //sRGBEncoding
      flat={true} //ACESFilmicToneMapping
      onCreated={(state) => {
        state.events.connect(dom.current)
        console.log("state.camera", state.camera)
      }}
    >
      <Controls />
      {/* <LControl /> */}
      {embedMode != "on" && (
        <GizmoHelper
          alignment="bottom-right" // widget alignment within scene
          margin={[65, 110]} // widget margins (X, Y)
          renderPriority={2}
        >
          <GizmoViewport
            axisColors={["white", "white", "white"]}
            labelColor="grey"
            hideNegativeAxes
            // @ts-ignore
            axisHeadScale={0.8}
          />
          {/* alternative: <GizmoViewcube /> */}
        </GizmoHelper>
      )}

      <A11yUserPreferences>
        <Preload all />
        <ContextBridge>{children}</ContextBridge>
      </A11yUserPreferences>
    </Canvas>
  )
}

export default LCanvas
