import { useEffect } from 'react'
import { useDomStore } from '@shadergradient'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import Dom from '@/components/layout/Dom'
import Header from '@/config'
import partition from '@/helpers/partition'

import '../../../ui-styles-compiled.css'

const LCanvas = dynamic(() => import('@/components/layout/LCanvasExport'), {
  ssr: false,
})

const Balance = ({ child }) => {
  const [r3f, dom] = partition(child, (c) => c.props.r3f === true)

  return (
    <>
      <Dom>{dom}</Dom>
      <LCanvas className='absolute top-0'>{r3f}</LCanvas>
    </>
  )
}

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()

  useEffect(() => {
    useDomStore.setState({ router })
  }, [router])

  const child = Component(pageProps).props.children

  return (
    <>
      <Header title={pageProps.title} />
      {child && child.length > 1 ? (
        <Balance child={Component(pageProps).props.children} />
      ) : (
        <Component {...pageProps} />
      )}
    </>
  )
}

export default App
