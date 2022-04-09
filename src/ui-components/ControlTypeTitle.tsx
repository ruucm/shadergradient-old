import * as React from 'react'
import cx from 'classnames'

type ControlTypeTitlePropsT = {
  title?: string
  active?: boolean
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const ControlTypeTitle: React.FC<ControlTypeTitlePropsT> = ({
  title,
  active,
  onClick,
  ...rest
}) => {
  const [hovered, setHovered] = React.useState(false)
  return (
    <div
      className={cx(
        'text-xl font-medium text-primary text-opacity-20 cursor-pointer',
        active && 'text-opacity-100',
        hovered && 'text-opacity-50'
      )}
      onClick={onClick}
      onMouseEnter={() => {
        setHovered(true)
      }}
      onMouseLeave={() => {
        setHovered(false)
      }}
    >
      {title}
    </div>
  )
}
