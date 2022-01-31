import { useQueryState } from '@/hooks/useQueryState'
import * as React from 'react'
import * as UI from '..'

type ShapeControlsPropsT = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ShapeControls: React.FC<ShapeControlsPropsT> = () => {
  const [type, setType] = useQueryState('type')
  const [animate, setAnimate] = useQueryState('animate')
  const [uTime, setUTime] = useQueryState('uTime')
  const [uSpeed, setUSpeed] = useQueryState('uSpeed')
  const [uStrength, setUStrength] = useQueryState('uStrength')
  const [uDensity, setUDensity] = useQueryState('uDensity')
  const [uFrequency, setUFrequency] = useQueryState('uFrequency')
  const [uAmplitude, setUAmplitude] = useQueryState('uAmplitude')
  const [positionX, setPositionX] = useQueryState('positionX')
  const [positionY, setPositionY] = useQueryState('positionY')
  const [positionZ, setPositionZ] = useQueryState('positionZ')
  const [rotationX, setRotationX] = useQueryState('rotationX')
  const [rotationY, setRotationY] = useQueryState('rotationY')
  const [rotationZ, setRotationZ] = useQueryState('rotationZ')

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

      <UI.InputPanel title='Noise Strength'>
        <UI.Slider
          defaultValue={uStrength}
          setValue={setUStrength}
          step={0.1}
          min={0}
          max={10}
        />
      </UI.InputPanel>

      <UI.InputPanel title='Noise Density'>
        <UI.Slider
          defaultValue={uDensity}
          setValue={setUDensity}
          step={0.1}
          min={0}
          max={7}
        />
      </UI.InputPanel>

      <UI.InputPanel title='uFrequency'>
        <UI.Slider
          defaultValue={uFrequency}
          setValue={setUFrequency}
          step={0.1}
          min={0}
          max={7}
        />
      </UI.InputPanel>
      <UI.InputPanel title='uAmplitude'>
        <UI.Slider
          defaultValue={uAmplitude}
          setValue={setUAmplitude}
          step={0.1}
          min={0}
          max={7}
        />
      </UI.InputPanel>

      <UI.InputPanel title='Position'>
        <UI.NumberInput
          label='x'
          step={0.1}
          value={positionX}
          setValue={setPositionX}
        />
        <UI.NumberInput
          label='y'
          step={0.1}
          value={positionY}
          setValue={setPositionY}
        />
        <UI.NumberInput
          label='z'
          step={0.1}
          value={positionZ}
          setValue={setPositionZ}
        />
      </UI.InputPanel>

      <UI.InputPanel title='Rotation'>
        <UI.NumberInput
          label='x'
          step={10}
          value={rotationX}
          setValue={setRotationX}
        />
        <UI.NumberInput
          label='y'
          step={10}
          value={rotationY}
          setValue={setRotationY}
        />
        <UI.NumberInput
          label='z'
          step={10}
          value={rotationZ}
          setValue={setRotationZ}
        />
      </UI.InputPanel>
    </div>
  )
}
