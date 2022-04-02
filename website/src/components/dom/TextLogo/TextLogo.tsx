import * as React from 'react'
import Link from 'next/link'

export function TextLogo({ color = 'white', size = 20 }) {
  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        height: 'fit-content',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href='/home2'>
        <h2
          style={{
            color: color,
            fontSize: size,
            fontWeight: 400,
            padding: '2px 5px',
            margin: 0,
            cursor: 'pointer',
            borderBottom: '2px solid ' + color,
          }}
        >
          ShaderGradient
        </h2>
      </Link>
    </div>
  )
}
