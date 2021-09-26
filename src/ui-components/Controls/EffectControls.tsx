import * as React from "react"
import { useContext } from "react"
import * as UI from ".."

type EffectControlsPropsT = {
  FormContext: React.Context<any>
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const EffectControls: React.FC<EffectControlsPropsT> = ({
  FormContext,
}) => {
  const { register, watch, setValue } = useContext(FormContext)
  const { grain, lightType, envPreset, reflection, brightness }: any = watch()

  return (
    <div className="flex flex-col gap-3">
      <UI.InputPanel title="Grain">
        <UI.Radio
          value="on"
          check={grain === "on"}
          label="On"
          {...register("grain")}
        />
        <UI.Radio
          value="off"
          check={grain === "off"}
          label="Off"
          {...register("grain")}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Light Type">
        <UI.Radio
          value="env"
          check={lightType === "env"}
          label="Environment"
          {...register("lightType")}
        />
        <UI.Radio
          value="3d"
          check={lightType === "3d"}
          label="3d lighting"
          {...register("lightType")}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Env Preset">
        <UI.Radio
          value="city"
          check={envPreset === "city"}
          label="City"
          {...register("envPreset")}
        />
        <UI.Radio
          value="dawn"
          check={envPreset === "dawn"}
          label="Dawn"
          {...register("envPreset")}
        />
        <UI.Radio
          value="library"
          check={envPreset === "library"}
          label="Library"
          {...register("envPreset")}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Reflection">
        <UI.Slider
          defaultValue={reflection}
          setValue={setValue}
          step={0.1}
          min={0}
          max={3}
          {...register("reflection")}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Brightness">
        <UI.Slider
          defaultValue={brightness}
          setValue={setValue}
          step={0.1}
          min={0}
          max={3}
          {...register("brightness")}
        />
      </UI.InputPanel>
    </div>
  )
}
