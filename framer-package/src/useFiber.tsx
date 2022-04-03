// source from https://github.com/pmndrs/react-three-fiber/issues/262#issuecomment-568274573

import React, { useContext, createContext } from 'react'

export function FiberCanvas({ fiber, children }) {
  const { Canvas } = fiber
  const value = useContext(context)

  return (
    <Canvas>
      {/* forward the context once more! */}
      <context.Provider value={value}>{children}</context.Provider>
    </Canvas>
  )
}

const context = createContext(null)

export const FiberContextProvider = ({ value, ...props }) => {
  // Share context values as a React state.
  return <context.Provider value={value} {...props} />
}

export const useFiber = () => {
  const ctx = useContext(context)
  if (ctx === undefined) {
    throw new Error(`useFiber must be used within a FiberContextProvider.`)
  }
  return ctx
}
