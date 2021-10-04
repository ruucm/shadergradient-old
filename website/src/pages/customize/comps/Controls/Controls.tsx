import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { useUIStore } from '@/helpers/store'
import { useOnClickOutside } from '@/hooks/use-onclick-outside'
import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import { UI } from 'shadergradient'
import styles from '../../../home/Home.module.scss'

type Props = {
  // All other props
  [x: string]: any
}

export const Controls: React.FC<Props> = ({
  isMobile,
  activeTab,
  setActiveTab,
}) => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)

  const ref = useRef(null)
  useOnClickOutside(ref, () => setActiveTab('none'))

  const children = (
    <UI.PropertyControls activeTab={activeTab} setActiveTab={setActiveTab} />
  )

  return (
    <div ref={ref}>
      {isMobile === true ? (
        <div className={styles.controlMobile}>
          <motion.div
            className={styles.hideBtn}
            onClick={() => {
              setActiveTab('none')
            }}
            animate={{
              opacity: activeTab === 'none' ? 0 : 1,
              marginTop: activeTab === 'none' ? '5px' : '-35px',
              transition: { duration: 0.5 },
            }}
          >
            <div>
              <p>✕</p>
            </div>
          </motion.div>
          {children}
        </div>
      ) : (
        <MenuWrapper
          mode={mode}
          setMode={setMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          {children}
        </MenuWrapper>
      )}
    </div>
  )
}