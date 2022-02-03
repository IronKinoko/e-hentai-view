import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
function useEnhanceLocalStorageState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    if (isBrowser) {
      const local = localStorage.getItem(key)
      return local ? JSON.parse(local) : defaultValue
    } else return defaultValue
  })

  useEffect(() => {
    if (state) {
      window.localStorage.setItem(key, JSON.stringify(state))
    }
  }, [state, key])

  return [state, setState] as const
}
export default useEnhanceLocalStorageState
