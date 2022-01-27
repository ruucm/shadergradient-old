// @ts-nocheck
import { initialCurrent } from "@/consts"
import create from "zustand"

export const useStore = create(() => {
  return {
    router: null,
    dom: null,
  }
})

export const useUIStore = create((set) => ({
  current: initialCurrent,
  mode: "full",
  loadingPercentage: 0,
  hoverState: 0,
  setMode: (data) => set((state: any) => ({ ...state, mode: data })),
  setCurrent: (data) => set((state: any) => ({ ...state, current: data })),
  setLoadingPercentage: (data) =>
    set((state: any) => ({ ...state, loadingPercentage: data })),
  setHoverState: (data) =>
    set((state: any) => ({ ...state, hoverState: data })),
}))
