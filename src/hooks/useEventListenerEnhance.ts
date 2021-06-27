import { useCallback, useMemo } from 'react'

type Fn = (val?: any) => void
export const store = new Map<string, Fn[]>()

const useEventManager = (eventName: string) => {
  const subscribe = useCallback(
    (fn: Fn) => {
      const list = store.get(eventName) || []
      list.push(fn)
      store.set(eventName, list)
      return () => {
        const list = store.get(eventName) || []
        store.set(
          eventName,
          list.filter((item) => item !== fn)
        )
      }
    },
    [eventName]
  )
  const emit = useCallback(
    (val?: any) => {
      const list = store.get(eventName) || []
      list.forEach((fn) => fn(val))
    },
    [eventName]
  )

  return useMemo(() => ({ emit, subscribe }), [emit, subscribe])
}

export default useEventManager
