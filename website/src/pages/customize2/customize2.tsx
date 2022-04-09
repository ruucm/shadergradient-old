import React, { useEffect, useState } from 'react'
import { PRESETS } from '@shadergradient'

import { useUIStore, GradientWithQueries } from '@shadergradient'
import styles from '../home2/Home.module.scss'
import { Controls } from './comps/Controls'
import { AboutBtn } from '@/components/dom/AboutBtn'
import { PresetTitle } from '@/components/dom/PresetTitle'
import { PreviewBtn } from '@/components/dom/PreviewBtn'
import { PreviewWrapper } from '@/components/dom/PreviewBtn/PreviewWrapper'
import { TextLogo } from '@/components/dom/TextLogo'

const DOM = () => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const loadingPercentage = useUIStore((state: any) => state.loadingPercentage)
  const activePreset = useUIStore((state) => state.activePreset)
  const setActivePreset = useUIStore((state) => state.setActivePreset)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState('none')

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 641) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  // create an event listener
  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    setMode('full')
  }, [])

  console.log('loadingPercentage', loadingPercentage)
  return (
    <>
      <PreviewWrapper mode={mode} setMode={setMode} />

      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <TextLogo
            color={mode !== 'full' ? '#FF430A' : PRESETS[activePreset].color}
            size={15}
          />
          <AboutBtn
            color={mode !== 'full' ? '#FF430A' : PRESETS[activePreset].color}
          />
        </div>
        <div className={styles.content}>
          <div
            className={styles.presetTitleWrapper}
            style={{ display: mode === 'full' ? 'block' : 'none' }}
          >
            {PRESETS.map((item, index) => {
              return (
                <PresetTitle
                  index={index}
                  color={item.color}
                  key={index}
                  title={
                    index < 10
                      ? '0' + index.toString() + ' ' + item.title
                      : index.toString() + ' ' + item.title
                  }
                  description={''}
                  size='small'
                ></PresetTitle>
              )
            })}
          </div>
          <Controls
            isMobile={isMobile}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>

        <div className={styles.footer}>
          <PreviewBtn
            mode={mode}
            setMode={setMode}
            color={mode !== 'full' ? '#FF430A' : PRESETS[activePreset].color}
          />
        </div>
      </div>
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      <GradientWithQueries r3f />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'ShaderGradient - customize',
    },
  }
}
