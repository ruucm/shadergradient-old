import * as React from "react"
import { useContext } from "react"
import { FormContext } from "../../helpers/form-provider"
import styles from "./PropertyControls.module.scss"

export function PropertyControls() {
  const ctx: any = useContext(FormContext) // States from Form

  return (
    <div
      style={{
        background: "black",
        color: "white",
        position: "fixed",
        right: 0,
        bottom: 0,
        zIndex: 999,
      }}
    >
      PropertyControls
      <div>
        <div className={styles.wrap}>
          <div>
            <input {...ctx.register("type")} type="radio" value="plane" />
            <label>Plane</label>
          </div>
          <div>
            <input {...ctx.register("type")} type="radio" value="sphere" />
            <label>Sphere</label>
          </div>
          <div>
            <input {...ctx.register("type")} type="radio" value="waterPlane" />
            <label>Water Plane</label>
          </div>
        </div>

        <div className={styles.wrap}>
          <div>
            <input
              {...ctx.register("postProcessing")}
              type="radio"
              value="threejs"
            />
            <label>threejs</label>
          </div>
          <div>
            <input
              {...ctx.register("postProcessing")}
              type="radio"
              value="r3f"
            />
            <label>@react-three/postprocessing</label>
          </div>
        </div>
      </div>
    </div>
  )
}
