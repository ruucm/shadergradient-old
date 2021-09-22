import * as React from "react"
import { Spacing } from "../Spacing"

type NumberInputPropsT = {
  label?: string
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const NumberInput = React.forwardRef<
  HTMLInputElement,
  NumberInputPropsT
>(({ label = "", ...inputProps }: NumberInputPropsT, ref) => {
  return (
    <div className="flex items-center">
      {label && (
        <>
          <label className="font-semibold text-primary">{label}</label>
          <Spacing className="w-2" />
        </>
      )}
      <input
        type="number"
        className="font-medium text-primary bg-primary bg-opacity-10 rounded h-input w-control-number-input text-center outline-none"
        ref={ref}
        {...inputProps}
      />
    </div>
  )
})
