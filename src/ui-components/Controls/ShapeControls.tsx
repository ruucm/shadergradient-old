import * as React from "react"
import * as UI from ".."

type ShapeControlsPropsT = {
  useQueryState: any
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ShapeControls: React.FC<ShapeControlsPropsT> = ({
  useQueryState,
}) => {
  const [type, setType] = useQueryState("type", "plane")
  const [animate, setAnimate] = useQueryState("animate", "on")

  console.log("animate", animate)

  return (
    <div className="flex flex-col gap-3">
      <UI.InputPanel title="Type">
        <UI.Radio
          name="type"
          value="plane"
          setValue={setType}
          check={type === "plane"}
          label="Plane"
        />
        <UI.Radio
          name="type"
          value="sphere"
          setValue={setType}
          check={type === "sphere"}
          label="Sphere"
        />
        <UI.Radio
          name="type"
          value="waterPlane"
          setValue={setType}
          check={type === "waterPlane"}
          label="Water"
        />
      </UI.InputPanel>

      <UI.InputPanel title="Animate">
        <UI.Radio
          name="animate"
          value="on"
          setValue={setAnimate}
          check={animate === "on"}
          label="On"
        />
        <UI.Radio
          name="animate"
          value="off"
          setValue={setAnimate}
          check={animate === "off"}
          label="Off"
        />
      </UI.InputPanel>

      {/* 
  

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
          setUStrength={setUStrength}
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
      </UI.InputPanel> */}
    </div>
  )
}
