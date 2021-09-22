import * as React from "react"
import ReactSlider from "react-slider"
import { Spacing, NumberInput } from ".."
import { useEffect, useState } from "react"

type SliderPropsT = {
  defaultValue: number
  setValue: any
  step: number
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const Slider = React.forwardRef<HTMLInputElement, SliderPropsT>(
  ({ defaultValue, setValue, step }: SliderPropsT, ref) => {
    const [sharedValue, setSharedValue] = useState<any>(defaultValue)
    useEffect(() => {
      setValue("uTime", sharedValue)
    }, [sharedValue])

    return (
      <div className="flex items-center w-full">
        <NumberInput
          type="number"
          value={sharedValue}
          onChange={(e: any) => setSharedValue(e.target.value)}
          step={step}
        />

        <Spacing className="w-4" />

        <ReactSlider
          value={Number(sharedValue)}
          step={step}
          min={0}
          max={9}
          onChange={(value, index) => setSharedValue(value)}
          // styles
          className="bg-primary h-slider w-full"
          marks={[4.5]}
          markClassName="w-mark h-mark bg-primary top-1/2 transform -translate-y-1/2 slider-mark-center-x"
          thumbClassName="bg-primary w-thumb h-thumb rounded-full top-1/2 transform -translate-y-1/2 outline-none"
          thumbActiveClassName="bg-opacity-80"
          // trackClassName={styles.track}
        />
      </div>
    )
  }
)
