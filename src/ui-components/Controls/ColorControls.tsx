import * as React from 'react'
import * as UI from '..'
import { useQueryState } from '@/hooks/useQueryState'

type ColorControlsPropsT = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ColorControls: React.FC<ColorControlsPropsT> = () => {
  const [color1, setColor1] = useQueryState('color1')
  const [color2, setColor2] = useQueryState('color2')
  const [color3, setColor3] = useQueryState('color3')

  return (
    <div className="flex flex-col gap-3">
      <UI.InputPanel title="Color 1">
        <UI.ColorInput defaultValue={color1} setValue={setColor1} />
      </UI.InputPanel>
      <UI.InputPanel title="Color 2">
        <UI.ColorInput defaultValue={color2} setValue={setColor2} />
      </UI.InputPanel>
      <UI.InputPanel title="Color 3">
        <UI.ColorInput defaultValue={color3} setValue={setColor3} />
      </UI.InputPanel>
    </div>
  )
}
