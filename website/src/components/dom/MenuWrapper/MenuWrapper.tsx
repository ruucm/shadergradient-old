import * as React from 'react'
import { useAnimation, motion } from 'framer-motion'
import cx from 'classnames'

export function MenuWrapper({
  mode = 'mobile',
  setMode = void 0,
  children,
  activeTab = 'none',
  setActiveTab = void 0,
}) {
  const menuAnim = useAnimation()

  React.useEffect(() => {
    if (activeTab === 'none') {
      menuAnim.start({
        top: '34px',
        right: '-470px',
        transition: { duration: 0.3 },
      })
    } else {
      menuAnim.start({
        right: '34px',
        transition: { duration: 0.3 },
      })
    }
  }, [activeTab])

  return (
    <motion.div
      className='absolute z-10 overflow-hidden bg-white rounded-md grid'
      style={{
        width: '600px',
        height: 'fit-content',
        gridTemplateColumns: '130px 370px',
        top: '34px',
        right: '-470px',
        boxShadow:
          mode === 'mobile' || mode === 'web'
            ? '-4px 4px 62px 0px rgba(0, 0, 0, 0.05)'
            : 'none',
        background: mode === 'about' ? '#141414' : 'white',
      }}
      animate={menuAnim}
    >
      {children}
    </motion.div>
  )
}

MenuWrapper.defaultProps = {}