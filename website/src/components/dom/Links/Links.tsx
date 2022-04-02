import * as React from 'react'
import { Framer, GitHub, Figma } from 'react-feather'
import styles from './Links.module.scss'
import { links } from '@/consts'

export function Links({ color }) {
  const iconSize = 30
  const iconStrokeWidth = 1.5
  return (
    <div className={styles.LinksWrapper} style={{ color: color }}>
      <p>Also available from</p>
      <div className={styles.iconWrapper}>
        <a href={links[2].link}>
          <Framer color={color} size={iconSize} strokeWidth={iconStrokeWidth} />
        </a>
        <a href={links[1].link}>
          <GitHub color={color} size={iconSize} strokeWidth={iconStrokeWidth} />
        </a>
        <a href={links[0].link}>
          <Figma color={color} size={iconSize} strokeWidth={iconStrokeWidth} />
        </a>
      </div>
    </div>
  )
}
