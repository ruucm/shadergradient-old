import * as React from 'react'
import { motion } from 'framer-motion'
import cx from 'classnames'

export function PreviewSwitch({
  mode = 'mobile',
  setMode = void 0,
  display = true,
}) {
  return (
    <div style={{ display: display ? 'block' : 'none' }}>
      <p className="mt-4 font-medium mb-1.5 text-primary">preview</p>
      <div className="flex gap-1.5">
        <motion.div
          className={cx(
            'rounded-sm cursor-pointer bg-primary w-[17px] h-[31px]'
          )}
          onClick={() => {
            if (mode !== 'mobile') {
              setMode('mobile')
            } else {
              setMode('full')
            }
          }}
          whileHover={{ opacity: 1 }}
          animate={{ opacity: mode === 'mobile' ? 1 : 0.2 }}
        ></motion.div>
        <motion.div
          className={cx(
            'rounded-sm cursor-pointer bg-primary w-[47px] h-[31px]'
          )}
          onClick={() => {
            if (mode !== 'web') {
              setMode('web')
            } else {
              setMode('full')
            }
          }}
          whileHover={{ opacity: 1 }}
          animate={{ opacity: mode === 'web' ? 1 : 0.2 }}
        ></motion.div>
      </div>
    </div>
  )
}

PreviewSwitch.defaultProps = {}
