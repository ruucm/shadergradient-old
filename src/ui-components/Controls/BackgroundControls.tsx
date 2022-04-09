import * as React from 'react'
import * as UI from '..'
import { useQueryState } from '@/hooks/useQueryState'

type BackgroundControlsPropsT = {
  hoverState?: number
  setHoverState?: any
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const BackgroundControls: React.FC<BackgroundControlsPropsT> = () => {
  const [bgColor1, setBgColor1] = useQueryState('bgColor1')
  const [bgColor2, setBgColor2] = useQueryState('bgColor2')

  return (
    <div className='flex flex-col gap-3'>
      <UI.InputPanel title='Bg Color 1' info={true}>
        <UI.ColorInput defaultValue={bgColor1} setValue={setBgColor1} />
      </UI.InputPanel>
      <UI.InputPanel title='Bg Color 2' info={true}>
        <UI.ColorInput defaultValue={bgColor2} setValue={setBgColor2} />
      </UI.InputPanel>
    </div>
  )
}
