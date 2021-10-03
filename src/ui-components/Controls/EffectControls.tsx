import * as React from "react"
import * as UI from ".."

type EffectControlsPropsT = {
  useQueryState: any
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const EffectControls: React.FC<EffectControlsPropsT> = ({
  useQueryState,
}) => {
  const [grain, setGrain] = useQueryState("grain")
  const [lightType, setLightType] = useQueryState("lightType")
  const [envPreset, setEnvPreset] = useQueryState("envPreset")
  const [reflection, setReflection] = useQueryState("reflection")
  const [brightness, setBrightness] = useQueryState("brightness")

  return (
    <div className="flex flex-col gap-3">
      <UI.InputPanel title="Grain">
        <UI.Radio
          name="grain"
          value="on"
          setValue={setGrain}
          check={grain === "on"}
          label="On"
        />
        <UI.Radio
          name="grain"
          value="off"
          setValue={setGrain}
          check={grain === "off"}
          label="Off"
        />
      </UI.InputPanel>

      <UI.InputPanel title="Light Type">
        <UI.Radio
          name="lightType"
          value="env"
          setValue={setLightType}
          check={lightType === "env"}
          label="Environment"
        />
        <UI.Radio
          name="lightType"
          value="3d"
          setValue={setLightType}
          check={lightType === "3d"}
          label="3d lighting"
        />
      </UI.InputPanel>

      <UI.InputPanel title="Env Preset">
        <UI.Radio
          name="envPreset"
          value="city"
          setValue={setEnvPreset}
          check={envPreset === "city"}
          label="City"
        />
        <UI.Radio
          name="envPreset"
          value="dawn"
          setValue={setEnvPreset}
          check={envPreset === "dawn"}
          label="Dawn"
        />
        <UI.Radio
          name="envPreset"
          value="lobby"
          setValue={setEnvPreset}
          check={envPreset === "lobby"}
          label="Lobby"
        />
      </UI.InputPanel>

      <UI.InputPanel title="Reflection">
        <UI.Slider
          defaultValue={reflection}
          setValue={setReflection}
          step={0.1}
          min={0}
          max={1}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Brightness">
        <UI.Slider
          defaultValue={brightness}
          setValue={setBrightness}
          step={0.1}
          min={0}
          max={3}
        />
      </UI.InputPanel>
    </div>
  )
}
