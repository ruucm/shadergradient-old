// custom pages/404.jsx !! Do not remove please or it will break build
import React from 'react'
import Link from 'next/link'
import { GradientScene } from '@/components/canvas/GradientScene'

const DOM = () => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '50vw',
        height: '100vh',
        right: 0,
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '40vw',
          color: '#ff430a',
          fontWeight: 500,
          height: 'fit-content',
        }}
      >
        <h1 style={{ fontSize: '6em', fontWeight: 600 }}>404</h1>
        <h2 style={{ fontSize: '2em', marginBottom: '0.5em' }}>
          Something went wrong.
        </h2>
        <h2 style={{ fontSize: '2em' }}>
          If you are here for something like this, please try again from{' '}
          <span style={{ textDecoration: 'underline' }}>
            <Link href='/'>→ ShaderGradient</Link>
          </span>
          .{' '}
        </h2>
      </div>
    </div>
  )
}

const R3F = () => {
  return (
    <>
      <GradientScene
        forceZoom={1}
        forceCamPos={{ x: -4, y: 1, z: 8 }}
        forceRot={[40, 0, 150]}
        forcePos={[-4, 0.5, 0]}
      />
    </>
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
