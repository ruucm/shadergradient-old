import * as React from 'react'
import cx from 'classnames'
import { motion } from 'framer-motion'

type ControlTypeTitlePropsT = {
  content?: string
  active?: boolean
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const HoverBox: React.FC<ControlTypeTitlePropsT> = ({
  content,
  active,
  onClick,
  ...rest
}) => {
  return (
    <motion.div
      className={cx('text-sm font-medium text-white')}
      style={{ position: 'absolute', marginLeft: -10, marginTop: 3 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        style={{
          position: 'relative',
          background: 'rgba(255, 67, 10, 0.8)',
          maxWidth: 230,
          width: 'fit-content',
          height: 'fit-content',
          padding: 8,
          borderRadius: 3,
        }}
      >
        {content}
      </div>
    </motion.div>
  )
}
