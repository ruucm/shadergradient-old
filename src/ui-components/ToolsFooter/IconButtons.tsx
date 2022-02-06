import * as React from 'react'
import cx from 'classnames'
import { Feather } from './Feather'
import * as Icons from 'react-feather'
import { motion } from 'framer-motion'
import * as UI from '..'

type ControlTypeTitlePropsT = {
  icon?: string
  content?: string
  active?: boolean
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const IconButtons: React.FC<ControlTypeTitlePropsT> = ({
  icon,
  content,
  active,
  onClick,
  ...rest
}) => {
  const [isHovered, setIsHovered] = React.useState(false)

  return (
    <motion.div
      className={cx(
        'text-sm font-medium cursor-pointer flex justify-center items-center'
      )}
      style={{
        borderRadius: 15,
        width: 30,
        height: 30,
        background: active ? 'rgba(255,67,10,1)' : 'rgba(255,67,10,0)',
      }}
      whileHover={{
        background: 'rgba(255,67,10,0.1)',
      }}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
      onClick={onClick}
    >
      <Feather
        /* @ts-ignore */
        name={icon}
        size={20}
        color={active ? 'white' : 'rgb(255,67,10)'}
      />
      {isHovered && <UI.IconHoverBox content={content} />}
    </motion.div>
  )
}
