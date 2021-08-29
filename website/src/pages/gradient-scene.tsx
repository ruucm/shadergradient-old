import { GUIGradient } from '@/components/dom/gui-gradient'
import { usePostProcessing } from '@/hooks/use-post-processing'
import { Environment } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import dynamic from 'next/dynamic'
import { Suspense, useContext } from 'react'
import { EffectComposer, Noise } from '@react-three/postprocessing'
import { FormContext } from '@/helpers/form-provider'
import { Box, Gradient } from 'shadergradient'

const Page = () => {
  return (
    <>
      <Gradient r3f type='waterPlane' />
      <GUIGradient />
    </>
  )
}

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Gradient Scene',
    },
  }
}
