import { GradientWithQueries } from '@shadergradient'

export function GradientScene({ aboutPage = false, ...forceProps }) {
  return <GradientWithQueries toggleZoom={aboutPage} {...forceProps} />
}
