import * as React from "react"
import styles from "./Button.module.scss"

type ButtonPropsT = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export const Button: React.FC<ButtonPropsT> = ({ children, ...rest }) => {
  return (
    <button className={styles.wrap} {...rest}>
      {children}
    </button>
  )
}
