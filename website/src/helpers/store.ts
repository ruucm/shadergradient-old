// @ts-nocheck
import { initialCurrent } from '@/consts'
import create from 'zustand'

export const useStore = create(() => {
  return {
    router: null,
    dom: null,
  }
})

export const useUIStore = create((set) => ({
  current: initialCurrent,
  mode: 'full',
  loadingPercentage: 0,
  load: false,
  setMode: (data) => set((state: any) => ({ ...state, mode: data })),
  setCurrent: (data) => set((state: any) => ({ ...state, current: data })),
  setLoadingPercentage: (data) =>
    set((state: any) => ({ ...state, loadingPercentage: data })),
  setLoad: (data) => set((state: any) => ({ ...state, load: data })),
}))
