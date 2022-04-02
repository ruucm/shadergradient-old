import * as React from 'react'
import { CubicBezierLine } from '@react-three/drei'

const lineProps: any = {
  midA: [0, 0, 0],
  midB: [0, 0, 0],
  lineWidth: 1,
}

export function AxesHelper() {
  return (
    <>
      <CubicBezierLine
        start={[0, 0, 0]}
        end={[10, 0, 0]}
        color='red'
        {...lineProps}
      />
      <CubicBezierLine
        start={[0, 0, 0]}
        end={[0, 10, 0]}
        color='green'
        {...lineProps}
      />
      <CubicBezierLine
        start={[0, 0, 0]}
        end={[0, 0, 10]}
        color='blue'
        {...lineProps}
      />
    </>
  )
}
