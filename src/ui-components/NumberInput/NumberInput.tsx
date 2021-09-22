import * as React from "react"

type NumberInputPropsT = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const NumberInput = ({ ...inputProps }) => {
  return (
    <input
      className="font-medium text-primary bg-primary bg-opacity-10 rounded h-input w-control-number-input text-center"
      {...inputProps}
    />
  )
}
