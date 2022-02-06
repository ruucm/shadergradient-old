import * as React from 'react'
import cx from 'classnames'
import * as UI from '..'

type ControlTypeTitlePropsT = {
  title?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ToolsFooter: React.FC<ControlTypeTitlePropsT> = ({
  title,
  ...rest
}) => {
  return (
    <div
      className={cx('text-sm font-medium flex')}
      style={{
        borderTop: '1px solid #D9D9D9',
        color: '#D9D9D9',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 5,
      }}
    >
      <p>Tools</p>
      <div className={cx('flex')}>
        <UI.IconButtons icon='CornerUpLeft' content='undo' />
        <UI.IconButtons icon='Box' content='3d axis' />
        <UI.IconButtons icon='Minimize2' content='zoom out' />
        <UI.IconButtons icon='Copy' content='copy url' />
      </div>
    </div>
  )
}
