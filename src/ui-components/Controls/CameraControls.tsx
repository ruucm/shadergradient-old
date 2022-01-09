import * as React from "react"
import * as UI from ".."
import { useQueryState } from "@/hooks/useQueryState"

type CameraControlsPropsT = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const CameraControls: React.FC<CameraControlsPropsT> = () => {
  const [cameraZoom, setCameraZoom] = useQueryState("cameraZoom")
  const [cameraPositionX, setCameraPositionX] = useQueryState("cameraPositionX")
  const [cameraPositionY, setCameraPositionY] = useQueryState("cameraPositionY")
  const [cameraPositionZ, setCameraPositionZ] = useQueryState("cameraPositionZ")

  return (
    <div className="flex flex-col gap-3">
      {/* Zoom */}
      <UI.InputPanel title="Zoom">
        <UI.Slider
          defaultValue={cameraZoom}
          setValue={setCameraZoom}
          step={0.1}
          min={0.1}
          max={5}
        />
      </UI.InputPanel>

      {/* Positions */}
      <UI.InputPanel title="Position X">
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
      </UI.InputPanel>
    </div>
  )
}
