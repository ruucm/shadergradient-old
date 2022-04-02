// @ts-nocheck
import create from 'zustand'
import { initialCurrent } from '@/consts'

export const useUIStore = create((set) => ({
  current: initialCurrent,
  mode: 'full',
  loadingPercentage: 0,
  setMode: (data) => set((state: any) => ({ ...state, mode: data })),
  setCurrent: (data) => set((state: any) => ({ ...state, current: data })),
  setLoadingPercentage: (data) =>
    set((state: any) => ({ ...state, loadingPercentage: data })),
}))
