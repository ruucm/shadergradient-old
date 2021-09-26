import create from 'zustand'
import qs from 'query-string'

const useStore = create(() => {
  return {
    router: null,
    dom: null,
  }
})

export default useStore

export const useGradientStore = create((set) => ({
  ...parseState(),
}))

export const updateGradientState = (querystate) => {
  const state = parseState(querystate)
  useGradientStore.setState(state, true)
}

function parseState(search = process.browser && window.location.search) {
  return qs.parse(search, {
    parseNumbers: true,
    parseBooleans: true,
    arrayFormat: 'index',
  })
}
