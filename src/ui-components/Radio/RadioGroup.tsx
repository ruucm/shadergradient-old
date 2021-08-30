import * as React from "react"
import styles from "./RadioGroup.module.scss"

type RadioGroupPropsT = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const RadioGroup: React.FC<RadioGroupPropsT> = ({
  children,
  ...rest
}) => {
  return (
    <div className={styles.wrap} {...rest}>
      {children}
    </div>
  )
}
