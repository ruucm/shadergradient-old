import * as React from 'react'
import * as UI from '..'
import { useQueryState } from '@/hooks/useQueryState'

type ShapeControlsPropsT = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ShapeControls: React.FC<ShapeControlsPropsT> = () => {
  const [type, setType] = useQueryState('type')
  const [shader, setShader] = useQueryState('shader')
  const [animate, setAnimate] = useQueryState('animate')
  const [uTime, setUTime] = useQueryState('uTime')
  const [uSpeed, setUSpeed] = useQueryState('uSpeed')
  const [uStrength, setUStrength] = useQueryState('uStrength')
  const [uDensity, setUDensity] = useQueryState('uDensity')
  const [uFrequency, setUFrequency] = useQueryState('uFrequency')
  const [uAmplitude, setUAmplitude] = useQueryState('uAmplitude')
  const [isHovered, setIsHovered] = React.useState('')

  return (
    <div className='flex flex-col gap-3'>
      <UI.InputPanel title='Type'>
        <UI.Radio
          name='type'
          value='plane'
          setValue={setType}
          check={type === 'plane'}
          label='Plane'
        />
        <UI.Radio
          name='type'
          value='sphere'
          setValue={setType}
          check={type === 'sphere'}
          label='Sphere'
        />
        <UI.Radio
          name='type'
          value='waterPlane'
          setValue={setType}
          check={type === 'waterPlane'}
          label='Water'
        />
      </UI.InputPanel>

      <UI.InputPanel title='Shader'>
        <UI.Radio
          name='shader'
          value='defaults'
          setValue={setShader}
          check={shader === 'defaults'}
          label='Defaults'
        />
        <UI.Radio
          name='shader'
          value='snakeHalftone'
          setValue={setShader}
          check={shader === 'snakeHalftone'}
          label='SnakeHalftone'
        />
        <UI.Radio
          name='shader'
          value='noise'
          setValue={setShader}
          check={shader === 'noise'}
          label='noise'
        />
      </UI.InputPanel>

      <UI.InputPanel title='Animate'>
        <UI.Radio
          name='animate'
          value='on'
          setValue={setAnimate}
          check={animate === 'on'}
          label='On'
        />
        <UI.Radio
          name='animate'
          value='off'
          setValue={setAnimate}
          check={animate === 'off'}
          label='Off'
        />
      </UI.InputPanel>

      {animate === 'off' && (
        <UI.InputPanel title='Movements'>
          <UI.Slider
            defaultValue={uTime}
            setValue={setUTime}
            step={0.1}
            min={0}
            max={9}
          />
        </UI.InputPanel>
      )}

      {animate === 'on' && (
        <UI.InputPanel title='Speed'>
          <UI.Slider
            defaultValue={uSpeed}
            setValue={setUSpeed}
            step={0.1}
            min={0}
            max={2}
          />
        </UI.InputPanel>
      )}

      <UI.InputPanel
        title='Noise Strength'
        info={true}
        hoverContent='Control the height of the bumps'
        isHovered={isHovered}
        onMouseEnter={() => {
          setIsHovered('Noise Strength')
        }}
        onMouseLeave={() => {
          setIsHovered('')
        }}
      >
        <UI.Slider
          defaultValue={uStrength}
          setValue={setUStrength}
          step={0.1}
          min={0}
          max={10}
        />
      </UI.InputPanel>

      <UI.InputPanel
        title='Noise Density'
        info={true}
        hoverContent='Control the frequency of the bumps'
        isHovered={isHovered}
        onMouseEnter={() => {
          setIsHovered('Noise Density')
        }}
        onMouseLeave={() => {
          setIsHovered('')
        }}
      >
        <UI.Slider
          defaultValue={uDensity}
          setValue={setUDensity}
          step={0.1}
          min={0}
          max={7}
        />
      </UI.InputPanel>

      {type === 'sphere' && (
        <UI.InputPanel title='Spiral'>
          <UI.Slider
            defaultValue={uAmplitude || 0}
            setValue={setUAmplitude}
            step={0.1}
            min={0}
            max={7}
          />
        </UI.InputPanel>
      )}
      <UI.ToolsFooter />
    </div>
  )
}
