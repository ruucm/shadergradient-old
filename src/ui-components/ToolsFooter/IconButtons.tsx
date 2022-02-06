import * as React from 'react'
import cx from 'classnames'
import { Feather } from './Feather'
import * as Icons from 'react-feather'
import { motion } from 'framer-motion'
import * as UI from '..'

type ControlTypeTitlePropsT = {
  icon?: string
  content?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const IconButtons: React.FC<ControlTypeTitlePropsT> = ({
  icon,
  content,
  onClick,
  ...rest
}) => {
  const [hoverProp, setHoverProp] = React.useState(false)

  return (
    <motion.div
      className={cx('text-sm font-medium cursor-pointer')}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        width: 36,
        height: 36,
        background: 'rgba(255,67,10,0)',
      }}
      whileHover={{
        background: 'rgba(255,67,10,0.1)',
      }}
      onMouseEnter={() => {
        setHoverProp(true)
      }}
      onMouseLeave={() => {
        setHoverProp(false)
      }}
    >
      {/* @ts-ignore */}
      <Feather name={icon} size={24} color='rgb(255,67,10)' />
      {hoverProp && <UI.HoverBox content={content} />}
    </motion.div>
  )
}
