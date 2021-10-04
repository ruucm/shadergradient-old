import create from 'zustand'

export const useStore = create(() => {
  return {
    router: null,
    dom: null,
  }
})

export const useUIStore = create((set) => ({
  current: 0,
  mode: 'full',
  firstLoad: 'never',
  setMode: (data) => set((state: any) => ({ ...state, mode: data })),
  setCurrent: (data) => set((state: any) => ({ ...state, current: data })),
  setFirstLoad: (data) => set((state: any) => ({ ...state, firstLoad: data })),
}))
