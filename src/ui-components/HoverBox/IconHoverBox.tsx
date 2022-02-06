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
      style={{
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: 80,
      }}
      // initial={{ opacity: 0, y: 10 }}
      // animate={{ opacity: 1, y: 0 }}
    >
      <div
        style={{
          width: 'fit-content',
          height: 'fit-content',
        }}
      >
        <div
          className={cx('bg-primary')}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: 3,
            opacity: 0.8,
            zIndex: 0,
            paddingTop: 22,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            className={cx('bg-primary')}
            style={{
              width: 17,
              height: 17,
              background: 'rgb(255, 67, 10)',
              transform: 'rotate(45deg)',
              margin: '0 auto',
              borderRadius: 3,
            }}
          ></div>
        </div>
        <p
          style={{
            padding: 8,
            zIndex: 20,
            position: 'relative',
            whiteSpace: 'nowrap',
          }}
        >
          {content}
        </p>
      </div>
    </div>
  )
}
