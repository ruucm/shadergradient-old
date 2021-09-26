import { useCallback } from 'react'
import qs from 'query-string'
import { useGradientStore } from '@/helpers/store'

function updateHistory(path) {
  window.history.pushState(null, document.title, path)
}

export const useQueryState = (propName, defaultValue = null) => {
  const selector = useCallback(
    (state) =>
      typeof state[propName] !== 'undefined' ? state[propName] : defaultValue,
    [propName, defaultValue]
  )
  const globalValue = useGradientStore(selector)
  const _setGlobalValue = useCallback(
    (valueFun) =>
      useGradientStore.setState({
        [propName]: valueFun(useGradientStore.getState()[propName]),
      }),
    [propName]
  )

  const setQueryValue = useCallback(
    (newVal) => {
      _setGlobalValue((currentState) => {
        if (typeof newVal === 'function') {
          newVal = newVal(currentState || defaultValue)
        }
        if (Number.isFinite(newVal)) {
          newVal = parseFloat(newVal.toFixed(2))
        }

        // defer update of URL
        setTimeout(() => {
          const query = useGradientStore.getState()
          updateHistory(
            qs.stringifyUrl(
              // @ts-ignore
              { url: window.location.pathname, query },
              { skipNull: true, arrayFormat: 'index' }
            )
          )
        }, 0)

        return newVal
      })
    },
    [_setGlobalValue]
  )

  return [globalValue, setQueryValue]
}

export default useQueryState
