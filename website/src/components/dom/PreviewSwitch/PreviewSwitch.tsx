import * as React from 'react'
import { motion } from 'framer-motion'
import cx from 'classnames'

export function PreviewSwitch({ mode = 'mobile', setMode = void 0 }) {
  return (
    <div>
      <p className='mt-4 font-medium mb-1.5 text-primary'>preview</p>
      <div className='flex gap-1.5'>
        <motion.div
          className={cx(
            'rounded-sm cursor-pointer bg-primary w-[17px] h-[31px]',
            mode !== 'mobile' && 'opacity-preview-btn'
          )}
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
            'rounded-sm cursor-pointer bg-primary w-[47px] h-[31px]',
            mode !== 'web' && 'opacity-preview-btn'
          )}
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
