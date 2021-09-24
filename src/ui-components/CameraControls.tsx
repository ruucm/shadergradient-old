import * as React from "react"
import { useContext } from "react"
import * as UI from "../ui-components"

type CameraControlsPropsT = {
  FormContext: React.Context<any>
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const CameraControls: React.FC<CameraControlsPropsT> = ({
  FormContext,
  ...rest
}) => {
  const { register, watch, setValue } = useContext(FormContext)

  const {
    cameraPositionX,
    cameraPositionY,
    cameraPositionZ,
    cameraQuaternionX,
    cameraQuaternionY,
    cameraQuaternionZ,
    cameraZoom,
    uTime,
  }: any = watch()

  return (
    <div className="flex flex-col gap-3">
      {/* Zoom */}
      <UI.InputPanel title="Camera Zoom">
        <UI.Slider
          defaultValue={cameraZoom}
          setValue={setValue}
          step={0.1}
          min={0}
          max={3}
          {...register("cameraZoom")}
        />
      </UI.InputPanel>

      {/* Positions */}
      <UI.InputPanel title="Camera Position X">
        <UI.Slider
          defaultValue={cameraPositionX}
          setValue={setValue}
          step={0.1}
          min={-5}
          max={5}
          {...register("cameraPositionX")}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Camera Position Y">
        <UI.Slider
          defaultValue={cameraPositionY}
          setValue={setValue}
          step={0.1}
          min={-5}
          max={5}
          {...register("cameraPositionY")}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Camera Position Z">
        <UI.Slider
          defaultValue={cameraPositionZ}
          setValue={setValue}
          step={0.1}
          min={-5}
          max={5}
          {...register("cameraPositionZ")}
        />
      </UI.InputPanel>
    </div>
  )
}
