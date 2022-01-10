import * as React from "react"
import * as UI from ".."
import { useQueryState } from "@/hooks/useQueryState"

type CameraControlsPropsT = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const CameraControls: React.FC<CameraControlsPropsT> = () => {
  // const [cameraZoom, setCameraZoom] = useQueryState("cameraZoom")
  const [cDistance, setCdistance] = useQueryState("cDistance")
  const [cameraPositionX, setCameraPositionX] = useQueryState("cameraPositionX")
  const [cameraPositionY, setCameraPositionY] = useQueryState("cameraPositionY")
  const [cameraPositionZ, setCameraPositionZ] = useQueryState("cameraPositionZ")

  const [cAzimuthAngle, setCazimuthAngle] = useQueryState("cAzimuthAngle")
  const [cPolarAngle, setCpolarAngle] = useQueryState("cPolarAngle")

  return (
    <div className="flex flex-col gap-3">
      {/* Zoom */}
      <UI.InputPanel title="Distance">
        <UI.Slider
          defaultValue={cDistance}
          setValue={setCdistance}
          step={0.1}
          min={0}
          max={20}
        />
      </UI.InputPanel>

      {/* Positions */}
      {/* <UI.InputPanel title="Position X">
        <UI.Slider
          defaultValue={cameraPositionX}
          setValue={setCameraPositionX}
          step={0.1}
          min={-5}
          max={5}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Position Y">
        <UI.Slider
          defaultValue={cameraPositionY}
          setValue={setCameraPositionY}
          step={0.1}
          min={-5}
          max={5}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Position Z">
        <UI.Slider
          defaultValue={cameraPositionZ}
          setValue={setCameraPositionZ}
          step={0.1}
          min={-5}
          max={5}
        />
      </UI.InputPanel> */}

      {/* rotateTo (camera-controls) */}
      <UI.InputPanel title="rotateTo">
        <UI.NumberInput
          label="azimuthAngle"
          step={10}
          value={cAzimuthAngle}
          setValue={setCazimuthAngle}
        />
        <UI.NumberInput
          label="polarAngle"
          step={10}
          value={cPolarAngle}
          setValue={setCpolarAngle}
        />
      </UI.InputPanel>
    </div>
  )
}
