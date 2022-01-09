import * as React from "react"
import { Spacing } from "."

type InputPanelPropsT = {
  title?: string
  children: React.ReactNode
  gap?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const InputPanel: React.FC<InputPanelPropsT> = ({
  title,
  children,
  gap = "w-2",
  ...rest
}) => {
  return (
    <div className="flex justify-between items-center gap-3.5" {...rest}>
      <span className="font-semibold text-primary w-[28%]">{title}</span>
      <div className="flex justify-between w-full">
        {React.Children.map(children, (child, id) => {
          return (
            <>
              <div key={id} className="w-full">
                {React.cloneElement(child as React.ReactElement<any>, {})}
              </div>
              {gap && id < React.Children.count(children) - 1 && (
                <Spacing className={`${gap} flex-shrink-0`} />
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}
