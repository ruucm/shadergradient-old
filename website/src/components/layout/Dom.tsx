import { useEffect, useRef } from 'react'
import { BackgroundGradient } from '@shadergradient'
import { useDomStore } from '@shadergradient'

const Dom = ({ children }) => {
  const ref = useRef(null)
  useEffect(() => {
    useDomStore.setState({ dom: ref })
  }, [])

  return (
    <>
      <div
        className='absolute top-0 left-0 z-10 w-screen h-screen overflow-hidden dom'
        ref={ref}
      >
        {children}
      </div>
      <BackgroundGradient />
    </>
  )
}

export default Dom
