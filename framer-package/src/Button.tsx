import * as React from 'react'
import styled from 'styled-components'
import styles from './Button.modules.css'

const Box = styled.span`
  background: red;
`

export function Button({ title = 'Title' }) {
  return (
    <button className={styles.button}>
      {title}
      <Box>Box</Box>
    </button>
  )
}
