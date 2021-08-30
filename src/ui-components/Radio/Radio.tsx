import * as React from "react"
import styles from "./Radio.module.scss"
import classNames from "classnames"

type RadioPropsT = {
  value: string
  label?: string
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const Radio = React.forwardRef<HTMLInputElement, RadioPropsT>(
  ({ label, ...inputProps }: RadioPropsT, ref) => {
    return (
      <label
        className={classNames(
          styles.label,
          inputProps.checked && styles.checked
        )}
        htmlFor={inputProps.value}
      >
        <input
          type="radio"
          id={inputProps.value} // for htmlFor focusing
          {...inputProps}
        />
        <span>{label || inputProps.value}</span>
      </label>
    )
  }
)
