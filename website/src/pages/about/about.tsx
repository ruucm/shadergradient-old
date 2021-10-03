import { motion, animate } from 'framer-motion'
import Link from 'next/link'
import { useUIStore } from '@/helpers/store'

import * as React from 'react'

import styles from '../home/Home.module.scss'

import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { MenuItem } from '../home/menu-item'
import { LazyGradient } from '@/components/dom/LazyGradient'

const DOM = () => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const [isMobile, setIsMobile] = React.useState(false)

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 641) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  // create an event listener
  React.useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    setMode('about')
    var body = document.getElementById('__next')
    var canvasElement = body?.getElementsByTagName('canvas')

    if (body?.style && canvasElement[0]?.style) {
      body.style.background = 'black'
      canvasElement[0].style.position = 'absolute'
      canvasElement[0].style.top = '-27vh'
    }
  }, [])

  return (
    <>
      {isMobile === true ? (
        <div
          className={styles.mobileOnly}
          style={{ color: '#ff430a', paddingLeft: '2em' }}
          onClick={() => {
            setMode('full')
          }}
        >
          <Link href='/'>← Main</Link>
        </div>
      ) : (
        <MenuWrapper mode={mode} setMode={setMode}>
          <div className={styles.menuItems}>
            <motion.div
              className='font-medium text-primary text-xl'
              initial={{ paddingLeft: 0 }}
              whileHover={{
                paddingLeft: 7,
                transition: { duration: 0.3 },
              }}
              style={{
                color: 'white',
                lineHeight: '1.7em',
                fontWeight: 500,
              }}
              onClick={() => {
                if (mode !== 'about') {
                  setMode('about')
                } else {
                  setMode('full')
                }
              }}
            >
              <Link href='/'>← Main</Link>
            </motion.div>
            <MenuItem title='Figma →' link='' />
            <MenuItem
              title='Git →'
              link='https://www.npmjs.com/package/shadergradient'
            />
            <MenuItem title='Framer →' link='' />
            <div style={{ opacity: 0.2 }}>
              <PreviewSwitch mode={mode} />
            </div>
          </div>
        </MenuWrapper>
      )}
      <motion.div className={styles.aboutModal}>
        <div className={styles.title}>
          <motion.h1
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
          >
            A shader is a set of instructions that calculates and draws every
            single pixel on the screen. The gradients are the part of the 3d
            object drawn by our custom shaders. The shaders create a natural
            movement and expression of the gradient that can make your digital
            products vibrant and lively. <br />
          </motion.h1>

          <motion.h1
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
          >
            You can control properties related to shape, color, effects, and
            camera. The three colors you pick are connected to the very top
            left, very top right, and the very bottom of the fluctuating plane.
            Explore more about properties by experimenting with them at{' '}
            <Link href='/customize'>→ customize</Link> page.
          </motion.h1>
          <motion.h1
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            initial={{ opacity: 0 }}
          >
            Made by two creatives,
            <br /> <a href=''>→ Ruucm</a> &{' '}
            <a href='https://seungmee-lee.com'>→ stone.skipper</a> with 17
            Sunday afternoons.
          </motion.h1>
        </div>
      </motion.div>
    </>
  )
}

const Page = () => {
  return (
    <>
      <DOM />
      <LazyGradient
        r3f
        forceZoom={0.5}
        forceCamPos={{ x: 0, y: 2, z: 8 }}
        forceRot={[(Math.PI / 3) * 2, 0, (Math.PI / 7) * 12]}
      />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Shader Gradient',
    },
  }
}
