import { initialCurrent } from '@/consts'
import { useUIStore } from '@/helpers/store'
import { WireframeOverlay, usePropertyStore } from '@shadergradient'

export function WireframeScene(forceProps) {
  const current = useUIStore((state: any) => state.current)
  const hoverState = usePropertyStore((state: any) => state.hoverState)
  const setLoadingPercentage = useUIStore(
    (state: any) => state.setLoadingPercentage
  )

  return (
    <WireframeOverlay
      {...forceProps}
      current={current}
      initialCurrent={initialCurrent}
      setLoadingPercentage={setLoadingPercentage}
      hoverState={hoverState}
    />
  )
}
