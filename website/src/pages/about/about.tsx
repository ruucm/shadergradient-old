import { motion, animate } from 'framer-motion'
import Link from 'next/link'
import { useUIStore } from '@/helpers/store'
import styles from '../home/Home.module.scss'
import { PreviewSwitch } from '@/components/dom/PreviewSwitch'
import { MenuWrapper } from '@/components/dom/MenuWrapper'
import { MenuItem } from '../home/menu-item'
import { GradientScene } from '@/components/canvas/GradientScene'
import { MotionLogo } from '@/components/dom/MotionLogo'
import { links } from '@/consts'
import { useEffect, useState } from 'react'

const DOM = () => {
  const mode = useUIStore((state: any) => state.mode)
  const setMode = useUIStore((state: any) => state.setMode)
  const [isMobile, setIsMobile] = useState(false)

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

    setMode('about')
  }, [])

  return (
    <>
      <MotionLogo color={true} />
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
          <div className='flex flex-col gap-0.2 p-3.5'>
            <motion.div
              className='font-medium text-primary text-xl'
              initial={{ paddingLeft: 0 }}
              whileHover={{
                paddingLeft: 7,
                transition: { duration: 0.3 },
              }}
              style={{
                color: 'white',
                fontWeight: 500,
              }}
            >
              <Link href='/'>← Main</Link>
            </motion.div>
            {links.map((item, id) => (
              <MenuItem key={id} title={item.title} link={item.link} />
            ))}
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
      <GradientScene
        r3f
        forceCamPos={{ x: 0, y: 2, z: 8 }}
        forceRot={[40, 0, 150]}
        forcePos={[0, 0.4, 0]}
        scale={0.2}
      />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Shader Gradient ─ About',
    },
  }
}
