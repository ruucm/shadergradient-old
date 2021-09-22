import * as React from "react"

type InputPanelPropsT = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const InputPanel: React.FC<InputPanelPropsT> = ({
  title,
  children,
  ...rest
}) => {
  return (
    <div className="flex justify-between items-center w-control" {...rest}>
      <span className="font-semibold text-primary w-control-title">
        {title}
      </span>
      <div className="flex justify-between w-control-inputs">{children}</div>
    </div>
  )
}
