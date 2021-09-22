import * as React from "react"

type RadioGroupPropsT = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const RadioGroup: React.FC<RadioGroupPropsT> = ({
  children,
  ...rest
}) => {
  return (
    <div className="flex w-controls" {...rest}>
      {children}
    </div>
  )
}
