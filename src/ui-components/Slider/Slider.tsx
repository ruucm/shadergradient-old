import * as React from "react"
import ReactSlider from "react-slider"
import styles from "./Slider.module.scss"
import { TextInput } from ".."
import cx from "classnames"
import { useEffect, useState } from "react"

type SliderPropsT = {
  defaultValue: number
  setValue: any
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const Slider = React.forwardRef<HTMLInputElement, SliderPropsT>(
  ({ defaultValue, setValue }: SliderPropsT, ref) => {
    const [sharedValue, setSharedValue] = useState<any>(defaultValue)
    useEffect(() => {
      setValue("uTime", sharedValue)
    }, [sharedValue])

    return (
      <div className={styles.wrap}>
        <TextInput
          type="number"
          value={sharedValue}
          onChange={(e: any) => setSharedValue(e.target.value)}
        />

        <ReactSlider
          value={Number(sharedValue)}
          marks
          step={1}
          min={0}
          max={9}
          onChange={(value, index) => setSharedValue(value)}
          renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
          // styles
          className={styles.hslider}
          markClassName={styles.mark}
          thumbClassName={styles.thumb}
          thumbActiveClassName={cx(styles.thumb, styles.active)}
          trackClassName={styles.track}
        />
      </div>
    )
  }
)
