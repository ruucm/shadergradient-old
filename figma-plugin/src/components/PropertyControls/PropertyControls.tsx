import * as React from "react"
import { useContext } from "react"
import { FormContext } from "../../helpers/form-provider"
import { Button } from "../Button"
import styles from "./PropertyControls.module.scss"

export function PropertyControls({ onSubmit }) {
  const { register, handleSubmit }: any = useContext(FormContext) // States from Form

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.wrap}>
        <div>
          <input {...register("type")} type="radio" value="plane" />
          <label>Plane</label>
        </div>
        <div>
          <input {...register("type")} type="radio" value="sphere" />
          <label>Sphere</label>
        </div>
        <div>
          <input {...register("type")} type="radio" value="waterPlane" />
          <label>Water Plane</label>
        </div>
      </div>

      <div className={styles.wrap}>
        <div>
          <input {...register("postProcessing")} type="radio" value="threejs" />
          <label>threejs</label>
        </div>
        <div>
          <input {...register("postProcessing")} type="radio" value="r3f" />
          <label>@react-three/postprocessing</label>
        </div>
      </div>
      <Button type="submit">Insert</Button>
    </form>
  )
}
