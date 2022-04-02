import * as React from 'react'
import useQueryState from '@/hooks/useQueryState'

export function BackgroundGradient() {
  const [bgColor1] = useQueryState('bgColor1')
  const [bgColor2] = useQueryState('bgColor2')

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'absolute',
        top: 0,
        backgroundImage: `linear-gradient(-225deg, ${bgColor1} 0%, ${bgColor2} 100%)`,
      }}
    />
  )
}
