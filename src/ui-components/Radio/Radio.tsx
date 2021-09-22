import * as React from "react"
import cx from "classnames"

type RadioPropsT = {
  value: string
  label?: string
  check?: boolean
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const Radio = React.forwardRef<HTMLInputElement, RadioPropsT>(
  ({ label, check, ...inputProps }: RadioPropsT, ref) => {
    return (
      <label
        className={cx(
          "flex justify-center items-center w-full h-5 text-primary rounded cursor-pointer",
          check && "bg-primary bg-opacity-10"
        )}
        htmlFor={inputProps.value}
      >
        <input
          type="radio"
          id={inputProps.value} // for htmlFor focusing
          className="absolute inline-block opacity-0 cursor-pointer"
          {...inputProps}
        />
        <span className="text-base font-medium">
          {label || inputProps.value}
        </span>
      </label>
    )
  }
)
