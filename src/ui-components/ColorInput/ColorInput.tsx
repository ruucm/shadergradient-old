import * as React from "react"
import { Spacing } from "../Spacing"

type ColorInputPropsT = {
  label?: string
  setValue: any
  defaultValue: number
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const ColorInput = React.forwardRef<HTMLInputElement, ColorInputPropsT>(
  (
    { label = "", defaultValue, setValue, ...inputProps }: ColorInputPropsT,
    ref
  ) => {
    const [sharedValue, setSharedValue] = React.useState<any>(defaultValue)
    React.useEffect(() => {
      setValue(name, sharedValue)
    }, [sharedValue])

    return (
      <div className="flex items-center">
        {label && (
          <>
            <label className="font-semibold text-primary">{label}</label>
            <Spacing className="w-2" />
          </>
        )}
        <input
          type="text"
          value={sharedValue}
          onChange={(e) => setSharedValue(e.target.value)}
          className="font-medium text-primary bg-primary bg-opacity-10 rounded h-input w-control-number-input text-center outline-none"
        />
        <input
          type="color"
          value={sharedValue}
          onChange={(e) => setSharedValue(e.target.value)}
        />
      </div>
    )
  }
)
