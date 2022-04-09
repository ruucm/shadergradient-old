import * as React from 'react'
import useQueryState from '@/hooks/useQueryState'

export function BackgroundGradient({ forceBG = null }) {
  const [bgColor1] = useQueryState('bgColor1')
  const [bgColor2] = useQueryState('bgColor2')

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        backgroundImage:
          forceBG !== null
            ? `linear-gradient(-225deg, ${forceBG} 0%, ${forceBG} 100%)`
            : `linear-gradient(-225deg, ${bgColor1} 0%, ${bgColor2} 100%)`,
      }}
    />
  )
}
