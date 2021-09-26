import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import { useEffect, Children } from 'react'
import Header from '@/config'
import dynamic from 'next/dynamic'
import Dom from '@/components/layout/dom'
import { FormContext } from '@/helpers/form-provider'
import { useForm } from 'react-hook-form'

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
  let r3fArr = []
  let compArr = []

  try {
    Children.forEach(comp(pageProps).props.children, (child) => {
      if (child?.props && child.props.r3f) {
        r3fArr.push(child)
      } else {
        compArr.push(child)
      }
    })

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

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()
  useEffect(() => {
    useStore.setState({ router })
  }, [router])
  const formProps = useForm({
    defaultValues: {
      noiseStrength: 0.1,
      // for gradient-scene
      type: 'plane',
      animate: 'off',
      movements: 0.2,
      speed: 1.8,
      bumpScale: 1.3,
      rotationX: 180,
      rotationY: 0,
      rotationZ: 0,
      env: 'env',
      postProcessing: 'threejs',
      cameraPositionX: 0,
      cameraPositionY: 3.2,
      cameraPositionZ: 0,
      cameraQuaternionX: -1.6,
      cameraQuaternionY: 0,
      cameraQuaternionZ: 0,
      cameraZoom: 0.5,
      // effects
      grain: 'on',
      lightType: 'env',
      envPreset: 'city',
      reflection: 0.2,
      brightness: 0.2,
      // colors
      color1: '#FD4912',
      color2: '#FFCB05',
      color3: '#708DFF',
    },
  })
  return (
    <>
      <Header title={pageProps.title} />
      <FormContext.Provider value={formProps}>
        <ForwardPropsToR3fComponent comp={Component} pageProps={pageProps} />
      </FormContext.Provider>
    </>
  )
}

export default App
