import { useRouter } from 'next/router'
import { useStore } from '@/helpers/store'
import { Children, useEffect } from 'react'
import Header from '@/config'
import Dom from '@/components/layout/dom'
import partition from '@/helpers/partition'
import dynamic from 'next/dynamic'

import '../../../ui-styles-compiled.css'

let LCanvas = null
if (process.env.NODE_ENV === 'production') {
  LCanvas = dynamic(() => import('@/components/layout/canvas'), {
    ssr: false,
  })
} else {
  LCanvas = require('@/components/layout/canvas').default
}

function Layout({ dom }) {
  return <>{dom && <Dom>{dom}</Dom>}</>
}

const ForwardPropsToR3fComponent = ({ comp, pageProps }) => {
  const r3fArr = []
  const compArr = []

  try {
    Children.forEach(comp(pageProps).props.children, (child) => {
      if (child?.props && child.props.r3f) {
        r3fArr.push(child)
      } else {
        compArr.push(child)
      }
    })

    if (!LCanvas) return <div />

    return (
      <>
        {compArr && <Layout dom={compArr} />}
        {r3fArr && <LCanvas>{r3fArr}</LCanvas>}
      </>
    )
  } catch (error) {
    // fallback security for SSG
    // @ts-ignore
    return <comp {...pageProps} />
  }
}

const Balance = ({ child }) => {
  const [r3f, dom] = partition(child, (c) => c.props.r3f === true)

  if (!LCanvas) return <div />

  return (
    <>
      <Dom>{dom}</Dom>
      <LCanvas>{r3f}</LCanvas>
    </>
  )
}

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  const child = Component(pageProps).props.children

  console.log('child', child)

  return (
    <>
      <Header title={pageProps.title} />
      <ForwardPropsToR3fComponent comp={Component} pageProps={pageProps} />

      {/* {child && child.length > 1 ? (
        <Balance child={Component(pageProps).props.children} />
      ) : (
        <Component {...pageProps} />
      )} */}
    </>
  )
}

export default App
