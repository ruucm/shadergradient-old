import { useSpring } from '@react-spring/core'
import { dToRArr } from '@/utils'

export function useShapeAnimation({ position, rotation }) {
  const { animatedPosition } = useSpring({ animatedPosition: position })
  const { animatedRotation } = useSpring({
    animatedRotation: dToRArr(rotation),
  })

  return { animatedPosition, animatedRotation }
}
