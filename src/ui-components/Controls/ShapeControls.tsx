import * as React from "react"
import { useContext } from "react"
import * as UI from ".."

type ShapeControlsPropsT = {
  FormContext: React.Context<any>
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ShapeControls: React.FC<ShapeControlsPropsT> = ({
  FormContext,
}) => {
  const { register, watch, setValue } = useContext(FormContext)

  const { type, animate, uTime, uSpeed, uStrength }: any = watch()

  return (
    <div className="flex flex-col gap-3">
      <UI.InputPanel title="Type">
        <UI.Radio
          value="plane"
          check={type === "plane"}
          label="Plane"
          {...register("type")}
        />
        <UI.Radio
          value="sphere"
          check={type === "sphere"}
          label="Sphere"
          {...register("type")}
        />
        <UI.Radio
          value="waterPlane"
          check={type === "waterPlane"}
          label="Water"
          {...register("type")}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Animate">
        <UI.Radio
          value="on"
          check={animate === "on"}
          label="On"
          {...register("animate")}
        />
        <UI.Radio
          value="off"
          check={animate === "off"}
          label="Off"
          {...register("animate")}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Movements">
        <UI.Slider
          defaultValue={uTime}
          setValue={setValue}
          step={0.1}
          min={0}
          max={9}
          {...register("uTime")}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Speed">
        <UI.Slider
          defaultValue={uSpeed}
          setValue={setValue}
          step={0.1}
          min={0}
          max={2}
          {...register("uSpeed")}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Bump Scale">
        <UI.Slider
          defaultValue={uStrength}
          setValue={setValue}
          step={0.1}
          min={0}
          max={10}
          {...register("uStrength")}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Rotation">
        <UI.NumberInput label="x" step={10} {...register("rotationX")} />
        <UI.NumberInput label="y" step={10} {...register("rotationY")} />
        <UI.NumberInput label="z" step={10} {...register("rotationZ")} />
      </UI.InputPanel>
    </div>
  )
}
