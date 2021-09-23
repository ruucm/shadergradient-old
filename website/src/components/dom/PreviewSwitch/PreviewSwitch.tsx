import * as React from 'react'
import { motion } from 'framer-motion'
import cx from 'classnames'

export function PreviewSwitch({ mode = 'mobile', setMode }) {
  return (
    <div>
      <p className='mt-4 mb-1.5'>preview</p>
      <div className='flex gap-1.5'>
        <motion.div
          className={cx(
            'rounded-sm cursor-pointer bg-primary',
            mode !== 'mobile' && 'opacity-preview-btn'
          )}
          style={{
            width: '17px',
            height: '31px',
          }}
          whileHover={{
            opacity: 1,
            transition: { duration: 0.3 },
          }}
          onClick={() => {
            if (mode !== 'mobile') {
              setMode('mobile')
            } else {
              setMode('full')
            }
          }}
        ></motion.div>
        <motion.div
          className={cx(
            'rounded-sm cursor-pointer bg-primary',
            mode !== 'web' && 'opacity-preview-btn'
          )}
          style={{
            width: '47px',
            height: '31px',
          }}
          whileHover={{
            opacity: 1,
            transition: { duration: 0.3 },
          }}
          onClick={() => {
            if (mode !== 'web') {
              setMode('web')
            } else {
              setMode('full')
            }
          }}
        ></motion.div>
      </div>
    </div>
  )
}

PreviewSwitch.defaultProps = {}
