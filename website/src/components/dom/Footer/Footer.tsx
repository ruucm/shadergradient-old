import * as React from 'react'
import cx from 'classnames'
import styles from '../../../pages/home/Home.module.scss'

export function Footer(color) {
  console.log(color)

  return (
    <div className={styles.footer} style={{ color: color.color }}>
      Made by <a href="">→ Ruucm</a> and{' '}
      <a href="https://seungmee-lee.com">→ stone.skipper</a> <br />
      Contact us for any inquiry.
    </div>
  )
}

Footer.defaultProps = {}
