// custom pages/404.jsx !! Do not remove please or it will break build
import React from 'react'
import { GradientWithQueries } from '@shadergradient'
import styles from '../pages/home2/Home.module.scss'
import { TextLogo } from '@/components/dom/TextLogo'

const DOM = () => {
  return (
    <div
      className={styles.contentWrapper}
      style={{ color: '#FF430A', textAlign: 'center' }}
    >
      <div className={styles.header}>
        <TextLogo color='#FF430A' size={15} />
      </div>
      <h1 style={{ fontSize: 60, marginTop: 30, fontWeight: 500 }}>Ooops...</h1>
      <p>
        Something went wrong. <br />
        If you're here for something like this, <br />
        please try again from ShaderGradient.
      </p>
    </div>
  )
}

const R3F = () => {
  return (
    <GradientWithQueries
      forceZoom={1}
      forceCamPos={{ x: -4, y: 1, z: 8 }}
      forceRot={[40, 0, 150]}
      forcePos={[-4, 0.5, 0]}
    />
  )
}

export default function Error() {
  return (
    <div>
      <DOM />
      {/* @ts-ignore */}
      <R3F r3f />
    </div>
  )
}
