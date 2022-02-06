import * as React from 'react'
import cx from 'classnames'
// import { motion } from 'framer-motion'

type ControlTypeTitlePropsT = {
  content?: string
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const IconHoverBox: React.FC<ControlTypeTitlePropsT> = ({
  content,
  onClick,
  ...rest
}) => {
  return (
    <div
      className={cx('text-sm font-medium text-white')}
      style={{ position: 'absolute', marginLeft: -10, marginTop: 7 }}
      // initial={{ opacity: 0, y: 10 }}
      // animate={{ opacity: 1, y: 0 }}
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
        <div
          style={{
            width: 17,
            height: 17,
            background: 'rgba(255, 67, 10, 0.8)',
            transform: 'rotate(45deg)',
            position: 'absolute',
            left: 9,
            top: -7,
            borderRadius: 3,
          }}
        ></div>
        {content}
      </div>
    </div>
  )
}
