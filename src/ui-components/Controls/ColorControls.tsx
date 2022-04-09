import * as React from 'react'
import * as UI from '..'
import { usePropertyStore } from '../../store'
import { useQueryState } from '@/hooks/useQueryState'

type ColorControlsPropsT = {
  hoverState?: number
  setHoverState?: any
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ColorControls: React.FC<ColorControlsPropsT> = () => {
  const [color1, setColor1] = useQueryState('color1')
  const [color2, setColor2] = useQueryState('color2')
  const [color3, setColor3] = useQueryState('color3')
  const hoverState = usePropertyStore((state: any) => state.hoverState)
  const [bgColor1, setBgColor1] = useQueryState('bgColor1')
  const [bgColor2, setBgColor2] = useQueryState('bgColor2')
  const [isHovered, setIsHovered] = React.useState('')
  const [bg, setBg] = React.useState('off')
  return (
    <div className='flex flex-col gap-3'>
      <UI.InputPanel
        title='Color 1'
        info={true}
        onMouseEnter={() => {
          usePropertyStore.setState({ hoverState: 1 })
        }}
        onMouseLeave={() => {
          usePropertyStore.setState({ hoverState: 0 })
        }}
      >
        <UI.ColorInput defaultValue={color1} setValue={setColor1} />
      </UI.InputPanel>
      <UI.InputPanel
        title='Color 2'
        info={true}
        onMouseEnter={() => {
          usePropertyStore.setState({ hoverState: 2 })
        }}
        onMouseLeave={() => {
          usePropertyStore.setState({ hoverState: 0 })
        }}
      >
        <UI.ColorInput defaultValue={color2} setValue={setColor2} />
      </UI.InputPanel>
      <UI.InputPanel
        title='Color 3'
        info={true}
        onMouseEnter={() => {
          usePropertyStore.setState({ hoverState: 3 })
        }}
        onMouseLeave={() => {
          usePropertyStore.setState({ hoverState: 0 })
        }}
      >
        <UI.ColorInput defaultValue={color3} setValue={setColor3} />
      </UI.InputPanel>

      <UI.InputPanel
        title='Background'
        info={true}
        hoverContent='Choose custom color for the background. Default is black'
        isHovered={isHovered}
        onMouseEnter={() => {
          setIsHovered('Background')
        }}
        onMouseLeave={() => {
          setIsHovered('')
        }}
      >
        <UI.Radio
          name='background'
          value='on'
          setValue={setBg}
          check={bg === 'on'}
          label='On'
        />
        <UI.Radio
          name='background'
          value='off'
          setValue={setBg}
          check={bg === 'off'}
          label='Off'
        />
      </UI.InputPanel>
      {bg === 'on' && (
        <>
          <UI.InputPanel title='Bg Color 1' info={true}>
            <UI.ColorInput
              defaultValue={bgColor1 || '#000000'}
              setValue={setBgColor1}
            />
          </UI.InputPanel>
          <UI.InputPanel title='Bg Color 2' info={true}>
            <UI.ColorInput
              defaultValue={bgColor2 || '#000000'}
              setValue={setBgColor2}
            />
          </UI.InputPanel>
        </>
      )}
    </div>
  )
}
