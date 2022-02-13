import * as React from 'react'
import * as UI from '..'
import { useQueryState } from '@/hooks/useQueryState'

type ViewControlsPropsT = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ViewControls: React.FC<ViewControlsPropsT> = () => {
  const [cDistance, setCdistance, saveCdistance] = useQueryState('cDistance')
  const [cameraZoom, setCameraZoom, saveCameraZoom] =
    useQueryState('cameraZoom')

  const [cameraPositionX, setCameraPositionX] = useQueryState('cameraPositionX')
  const [cameraPositionY, setCameraPositionY] = useQueryState('cameraPositionY')
  const [cameraPositionZ, setCameraPositionZ] = useQueryState('cameraPositionZ')

  const [cAzimuthAngle, setCazimuthAngle] = useQueryState('cAzimuthAngle')
  const [cPolarAngle, setCpolarAngle] = useQueryState('cPolarAngle')

  const [positionX, setPositionX] = useQueryState('positionX')
  const [positionY, setPositionY] = useQueryState('positionY')
  const [positionZ, setPositionZ] = useQueryState('positionZ')
  const [rotationX, setRotationX] = useQueryState('rotationX')
  const [rotationY, setRotationY] = useQueryState('rotationY')
  const [rotationZ, setRotationZ] = useQueryState('rotationZ')
  const [isHovered, setIsHovered] = React.useState('')

  const [type] = useQueryState('type')

  return (
    <div className='flex flex-col gap-3'>
      {/* Zoom */}

      {type !== 'sphere' && (
        <UI.InputPanel title='Distance'>
          <UI.Slider
            defaultValue={cDistance}
            setValue={setCdistance}
            saveValue={saveCdistance}
            step={0.1}
            min={0}
            max={20}
          />
        </UI.InputPanel>
      )}
      {type === 'sphere' && (
        <UI.InputPanel title='Zoom'>
          <UI.Slider
            defaultValue={cameraZoom}
            setValue={setCameraZoom}
            saveValue={saveCameraZoom}
            step={0.1}
            min={0.1}
            max={30}
          />
        </UI.InputPanel>
      )}

      {/* Positions */}
      {/* <UI.InputPanel title="Position X">
        <UI.Slider
          defaultValue={cameraPositionX}
          setValue={setCameraPositionX}
          step={0.1}
          min={-5}
          max={5}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Position Y">
        <UI.Slider
          defaultValue={cameraPositionY}
          setValue={setCameraPositionY}
          step={0.1}
          min={-5}
          max={5}
        />
      </UI.InputPanel>

      <UI.InputPanel title="Position Z">
        <UI.Slider
          defaultValue={cameraPositionZ}
          setValue={setCameraPositionZ}
          step={0.1}
          min={-5}
          max={5}
        />
      </UI.InputPanel> */}

      {/* rotateTo (camera-controls) */}
      <UI.InputPanel
        title='Camera Angle'
        info={true}
        hoverContent='Azimuth as a latitude, Polar as a longtitude'
        isHovered={isHovered}
        onMouseEnter={() => {
          setIsHovered('Camera Angle')
        }}
        onMouseLeave={() => {
          setIsHovered('')
        }}
      >
        <UI.NumberInput
          label='azimuth'
          step={10}
          value={cAzimuthAngle}
          setValue={setCazimuthAngle}
        />
        <UI.NumberInput
          label='polar'
          step={10}
          min={0}
          max={180}
          value={cPolarAngle}
          setValue={setCpolarAngle}
        />
      </UI.InputPanel>

      {/* Object Controls */}
      <UI.InputPanel title='Object Position'>
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

      <UI.InputPanel title='Object Rotation'>
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
      <UI.ToolsFooter />
    </div>
  )
}
