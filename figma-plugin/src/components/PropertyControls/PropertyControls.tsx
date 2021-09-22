import * as React from "react"
import { useContext } from "react"
import { FormContext } from "../../helpers/form-provider"
import { UI } from "shadergradient"

export function PropertyControls({ onSubmit }) {
  const { register, handleSubmit, watch }: any = useContext(FormContext) // States from Form

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UI.InputPanel>
        <UI.Radio
          value="plane"
          check={watch("type") === "plane"}
          label="Plane"
          {...register("type")}
        />
        <UI.Radio
          value="sphere"
          check={watch("type") === "sphere"}
          label="Sphere"
          {...register("type")}
        />
        <UI.Radio
          value="waterPlane"
          check={watch("type") === "waterPlane"}
          label="Water"
          {...register("type")}
        />
      </UI.InputPanel>

      <UI.Spacing height="20px" />

      <UI.InputPanel>
        <UI.Radio
          value="threejs"
          check={watch("postProcessing") === "threejs"}
          {...register("postProcessing")}
        />
        <UI.Radio
          value="r3f"
          check={watch("postProcessing") === "r3f"}
          {...register("postProcessing")}
        />
      </UI.InputPanel>

      <UI.Spacing height="20px" />

      <UI.Button type="submit">Insert</UI.Button>
    </form>
  )
}
