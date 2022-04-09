import React, { useEffect, useState } from 'react'

import {
  useUIStore,
  GradientWithQueries,
  useQueryState,
  PRESETS,
} from '@shadergradient'
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
  const [embedMode] = useQueryState('embedMode')

  console.log('loadingPercentage', loadingPercentage)
  if (embedMode === 'off') {
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
                    isMobile={isMobile}
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
  } else return <></>
}
const R3F = ({ r3f }) => {
  return (
    <>
      <GradientWithQueries />
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      <R3F r3f />
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
