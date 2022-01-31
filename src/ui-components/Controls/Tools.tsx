import { useQueryState } from '@/hooks/useQueryState'
import * as React from 'react'
import * as UI from '..'

type ToolsPropsT = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Tools: React.FC<ToolsPropsT> = () => {
  const [wireframe, setWireframe] = useQueryState('wireframe')
  const [axesHelper, setAxesHelper] = useQueryState('axesHelper')
  const [gizmoHelper, setGizmoHelper] = useQueryState('gizmoHelper')

  return (
    <div className='flex flex-col gap-3'>
      <UI.InputPanel title='Wireframe'>
        <UI.Radio
          name='wireframe'
          value='enable'
          setValue={setWireframe}
          check={wireframe === 'enable'}
          label='On'
        />
        <UI.Radio
          name='wireframe'
          value='false'
          setValue={setWireframe}
          check={wireframe === 'false'}
          label='Off'
        />
      </UI.InputPanel>

      <UI.InputPanel title='Axes'>
        <UI.Radio
          name='axesHelper'
          value='on'
          setValue={setAxesHelper}
          check={axesHelper === 'on'}
          label='On'
        />
        <UI.Radio
          name='axesHelper'
          value='off'
          setValue={setAxesHelper}
          check={axesHelper === 'off'}
          label='Off'
        />
      </UI.InputPanel>

      <UI.InputPanel title='Gizmo'>
        <UI.Radio
          name='gizmoHelper'
          value='show'
          setValue={setGizmoHelper}
          check={gizmoHelper === 'show'}
          label='On'
        />
        <UI.Radio
          name='gizmoHelper'
          value='hide'
          setValue={setGizmoHelper}
          check={gizmoHelper === 'hide'}
          label='Off'
        />
      </UI.InputPanel>
    </div>
  )
}
