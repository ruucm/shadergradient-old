import * as React from 'react'
import { motion, useAnimation } from 'framer-motion'
import cx from 'classnames'

export function PreviewSwitch({
  mode = 'mobile',
  setMode = void 0,
  display = true,
}) {
  const mobileIconAnim = useAnimation()
  const webIconAnim = useAnimation()

  // React.useEffect(() => {
  //   if (mode === 'mobile') {
  //     mobileIconAnim.start({
  //       opacity: 1,
  //     })
  //     webIconAnim.start({
  //       opacity: 0.2,
  //     })
  //   } else if (mode === 'web') {
  //     mobileIconAnim.start({
  //       opacity: 0.2,
  //     })
  //     webIconAnim.start({
  //       opacity: 1,
  //     })
  //   } else {
  //     mobileIconAnim.start({
  //       opacity: 0.2,
  //     })
  //     webIconAnim.start({
  //       opacity: 0.2,
  //     })
  //   }
  //   console.log(mode)
  // }, [mode, mobileIconAnim, webIconAnim])
  return (
    <div style={{ display: display ? 'block' : 'none' }}>
      <p className='mt-4 font-medium mb-1.5 text-primary'>preview</p>
      <div className='flex gap-1.5'>
        <motion.div
          className={cx(
            'rounded-sm cursor-pointer bg-primary w-[17px] h-[31px]',
            mode !== 'mobile' && 'opacity-preview-btn'
          )}
          // whileHover={{
          //   opacity: 1,
          //   transition: { duration: 0.3 },
          // }}
          onClick={() => {
            if (mode !== 'mobile') {
              setMode('mobile')
            } else {
              setMode('full')
            }
          }}
          animate={mobileIconAnim}
          // style={{ opacity: mode === 'mobile' ? 1 : 0.2 }}
        ></motion.div>
        <motion.div
          className={cx(
            'rounded-sm cursor-pointer bg-primary w-[47px] h-[31px]',
            mode !== 'web' && 'opacity-preview-btn'
          )}
          // whileHover={{
          //   opacity: 1,
          //   transition: { duration: 0.3 },
          // }}
          onClick={() => {
            if (mode !== 'web') {
              setMode('web')
            } else {
              setMode('full')
            }
          }}
          animate={webIconAnim}
          // style={{ opacity: mode === 'web' ? 1 : 0.2 }}
        ></motion.div>
      </div>
    </div>
  )
}

PreviewSwitch.defaultProps = {}
