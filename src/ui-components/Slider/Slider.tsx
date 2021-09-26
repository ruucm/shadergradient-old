import * as React from "react"
import ReactSlider from "react-slider"
import { Spacing, NumberInput } from ".."
import { useEffect, useState } from "react"

type SliderPropsT = {
  defaultValue: number
  name: string
  setValue: any
  setUStrength: any
  step: number
  min: number
  max: number
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const Slider = React.forwardRef<HTMLInputElement, SliderPropsT>(
  (
    {
      defaultValue,
      name,
      setValue,
      setUStrength,
      step,
      min,
      max,
    }: SliderPropsT,
    ref
  ) => {
    const [sharedValue, setSharedValue] = useState<any>(defaultValue)
    useEffect(() => {
      setValue(name, sharedValue)
      if (setUStrength) setUStrength(sharedValue)
    }, [sharedValue])

    return (
      <div className="flex items-center w-full">
        <NumberInput
          value={sharedValue}
          onChange={(e: any) => setSharedValue(e.target.value)}
          step={step}
        />

        <Spacing className="w-4" />

        <ReactSlider
          value={Number(sharedValue)}
          step={step}
          min={min}
          max={max}
          onChange={(value, index) => setSharedValue(value)}
          // styles
          className="bg-primary h-slider w-full"
          marks={[(min + max) / 2]}
          markClassName="w-mark h-mark bg-primary top-1/2 transform -translate-y-1/2 slider-mark-center-x"
          thumbClassName="bg-primary w-thumb h-thumb rounded-full top-1/2 transform -translate-y-1/2 outline-none cursor-pointer"
          thumbActiveClassName="bg-opacity-80"
          // trackClassName={styles.track}
        />
      </div>
    )
  }
)
