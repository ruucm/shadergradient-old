import * as React from "react"
import styles from "./TextInput.module.scss"

type TextInputPropsT = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export const TextInput = ({ ...inputProps }) => {
  return <input className={styles.wrap} {...inputProps} />
}
