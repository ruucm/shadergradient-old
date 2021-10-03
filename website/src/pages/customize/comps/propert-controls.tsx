import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { useUIStore } from '@/helpers/store'
import { useOnClickOutside } from '@/hooks/use-onclick-outside'
import { motion } from 'framer-motion'
import React, { useRef } from 'react'
import { UI } from '../../../../../dist'
import styles from '../../home/Home.module.scss'
import cx from 'classnames'

type Props = {
  // All other props
  [x: string]: any
}

export const PropertyControls: React.FC<Props> = ({
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
      <div className={styles.menuItems} onClick={() => setActiveTab('shape')}>
        <UI.ControlTypeTitle
          title='Shape'
          active={activeTab === 'shape'}
          onClick={() => {
            activeTab === 'shape' ? setActiveTab('none') : setActiveTab('shape')
          }}
        />

        <UI.ControlTypeTitle
          title='Colors'
          active={activeTab === 'colors'}
          onClick={(e) => {
            e.stopPropagation() // ignore parent click

            activeTab === 'colors'
              ? setActiveTab('none')
              : setActiveTab('colors')
          }}
        />

        <UI.ControlTypeTitle
          title='Effects'
          active={activeTab === 'effects'}
          onClick={(e) => {
            e.stopPropagation() // ignore parent click

            activeTab === 'effects'
              ? setActiveTab('none')
              : setActiveTab('effects')
          }}
        />

        <UI.ControlTypeTitle
          title='Camera'
          active={activeTab === 'camera'}
          onClick={(e) => {
            e.stopPropagation() // ignore parent click

            activeTab === 'camera'
              ? setActiveTab('none')
              : setActiveTab('camera')
          }}
        />
        <PreviewSwitch mode={mode} setMode={setMode} display={!isMobile} />
      </div>

      <div
        className={cx(styles.controlWrapper, 'p-3.5 md:p-4')}
        style={{ padding: activeTab === 'none' ? 0 : null }}
      >
        {activeTab === 'shape' && <UI.ShapeControls />}
        {activeTab === 'colors' && <UI.ColorControls />}
        {activeTab === 'effects' && <UI.EffectControls />}
        {activeTab === 'camera' && <UI.CameraControls />}
      </div>
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
        >
          {children}
        </MenuWrapper>
      )}
    </div>
  )
}
