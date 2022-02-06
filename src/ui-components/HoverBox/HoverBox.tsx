import * as React from 'react'
import cx from 'classnames'
import { motion } from 'framer-motion'

type ControlTypeTitlePropsT = {
  content?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const HoverBox: React.FC<ControlTypeTitlePropsT> = ({
  content,
  onClick,
  ...rest
}) => {
  return (
    <motion.div
      className={cx('text-sm font-medium text-white')}
      style={{ position: 'absolute', marginLeft: -10, marginTop: 10 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div
        style={{
          position: 'relative',
          maxWidth: 230,
          width: 'fit-content',
          height: 'fit-content',
          padding: 8,
        }}
      >
        <div
          style={{
            background: 'rgb(255, 67, 10)',
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 3,
            opacity: 0.8,
          }}
        >
          <div
            style={{
              width: 17,
              height: 17,
              background: 'rgb(255, 67, 10)',
              transform: 'rotate(45deg)',
              position: 'absolute',
              left: 9,
              top: -7,
              borderRadius: 3,
            }}
          ></div>
        </div>
        <p>{content}</p>
      </div>
    </motion.div>
  )
}
