import * as React from "react"
import styles from "./Button.module.scss"

type ButtonPropsT = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

const ButtonType = {
  primary: "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded",
  secondary: "bg-blue-500 hover:bg-blue-700 text-white font-bold rounded",
}

export const Button: React.FC<ButtonPropsT> = ({ children, ...rest }) => {
  return (
    <button
      // className={styles.wrap}

      className="bg-primary h-button font-medium text-white rounded"
      {...rest}
    >
      {children}
    </button>
  )
}
