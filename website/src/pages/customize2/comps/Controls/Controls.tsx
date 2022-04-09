import React, { useRef } from 'react'
import { UI, useUIStore } from '@shadergradient'
import { motion } from 'framer-motion'
import styles from './Controls.module.scss'
import { HorizontalControl } from '@/components/dom/HorizontalControl'
import { useOnClickOutside } from '@/hooks/use-onclick-outside'

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
    <>
      {!isMobile && (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <UI.ControlTabTitles
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <UI.ToolsBox darkMode={false} />
        </div>
      )}
      <UI.PropertyControls activeTab={activeTab} setActiveTab={setActiveTab} />

      {isMobile && (
        <UI.ControlTabTitles
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
    </>
  )

  return (
    <div ref={ref}>
      {isMobile === true ? (
        <div className={styles.controlMobile}>
          <motion.div className={styles.floating}>
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
            {/* <UI.ToolsBox darkMode={false} /> */}
          </motion.div>
          {children}
        </div>
      ) : (
        <HorizontalControl
          mode={mode}
          setMode={setMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        >
          {children}
        </HorizontalControl>
      )}
    </div>
  )
}
