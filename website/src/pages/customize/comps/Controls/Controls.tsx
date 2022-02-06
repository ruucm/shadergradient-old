import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { useUIStore } from '@/helpers/store'
import { useOnClickOutside } from '@/hooks/use-onclick-outside'
import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import { UI } from '@shadergradient'
import styles from './Controls.module.scss'

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
  const hoverState = useUIStore((state: any) => state.hoverState)
  const setHoverState = useUIStore((state: any) => state.setHoverState)

  const ref = useRef(null)
  useOnClickOutside(ref, () => setActiveTab('none'))

  const children = (
    <>
      {!isMobile && (
        <UI.ControlTypeTitles
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}
      <UI.PropertyControls activeTab={activeTab} setActiveTab={setActiveTab} />
      {!isMobile && (
        <div className='absolute left-3.5 bottom-3.5'>
          <PreviewSwitch mode={mode} setMode={setMode} />
        </div>
      )}
      {isMobile && (
        <UI.ControlTypeTitles
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
          className='min-h-[336px]' // shape control's height
        >
          {children}
        </MenuWrapper>
      )}
    </div>
  )
}
