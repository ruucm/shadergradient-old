import { ruucmCurations } from './ruucmCurations'
import { ruucmMainCurations } from './ruucmMainCurations'
import { smCurationCandidate } from './smCurations'
import { templates } from './templates'

export const PRESETS = [
  ...ruucmMainCurations,
  ...ruucmCurations,
  // ...smCurationCandidate,
  ...templates,
]
