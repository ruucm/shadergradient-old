import * as React from "react"

type RadioGroupPropsT = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const RadioGroup: React.FC<RadioGroupPropsT> = ({
  title,
  children,
  ...rest
}) => {
  return (
    <div className="flex justify-between items-center w-control" {...rest}>
      <span className="font-semibold text-primary w-control-title">
        {title}
      </span>
      <div className="flex w-control-inputs">{children}</div>
    </div>
  )
}
