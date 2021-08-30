import * as React from "react"
import { useContext } from "react"
import { FormContext } from "../../helpers/form-provider"
import { UI } from "shadergradient"
import styles from "./PropertyControls.module.scss"

export function PropertyControls({ onSubmit }) {
  const { register, handleSubmit, watch }: any = useContext(FormContext) // States from Form
  const fruitsValue = watch("Fruits")

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <UI.RadioGroup>
        <UI.Radio
          value="Apple"
          checked={fruitsValue === "Apple"}
          {...register("Fruits")}
        />
        <UI.Radio
          value="Banana"
          checked={fruitsValue === "Banana"}
          {...register("Fruits")}
        />
      </UI.RadioGroup>

      <UI.Spacing height="20px" />

      <UI.RadioGroup>
        <UI.Radio
          value="plane"
          checked={watch("type") === "plane"}
          {...register("type")}
        />
        <UI.Radio
          value="sphere"
          checked={watch("type") === "sphere"}
          {...register("type")}
        />
        <UI.Radio
          value="waterPlane"
          checked={watch("type") === "waterPlane"}
          {...register("type")}
        />
      </UI.RadioGroup>

      <UI.Spacing height="20px" />

      <UI.RadioGroup>
        <UI.Radio
          value="threejs"
          checked={watch("postProcessing") === "threejs"}
          {...register("postProcessing")}
        />
        <UI.Radio
          value="r3f"
          checked={watch("postProcessing") === "r3f"}
          {...register("postProcessing")}
        />
      </UI.RadioGroup>

      <UI.Spacing height="20px" />

      <UI.Button type="submit">Insert</UI.Button>
    </form>
  )
}
