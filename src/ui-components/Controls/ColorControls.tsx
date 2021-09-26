import * as React from "react"
import { useContext } from "react"
import * as UI from ".."

type ColorControlsPropsT = {
  FormContext: React.Context<any>
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ColorControls: React.FC<ColorControlsPropsT> = ({
  FormContext,
  ...rest
}) => {
  const { register, watch, setValue } = useContext(FormContext)
  const { color1, color2, color3 }: any = watch()

  return (
    <div className="flex flex-col gap-3">
      <UI.InputPanel title="Color 1">
        <UI.ColorInput
          defaultValue={color1}
          setValue={setValue}
          {...register("color1")}
        />
      </UI.InputPanel>
      <UI.InputPanel title="Color 2">
        <UI.ColorInput
          defaultValue={color2}
          setValue={setValue}
          {...register("color2")}
        />
      </UI.InputPanel>
      <UI.InputPanel title="Color 3">
        <UI.ColorInput
          defaultValue={color3}
          setValue={setValue}
          {...register("color3")}
        />
      </UI.InputPanel>
    </div>
  )
}
