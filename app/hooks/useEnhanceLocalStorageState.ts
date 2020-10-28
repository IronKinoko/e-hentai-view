import { useLocalStorageState } from '@umijs/hooks'
import { useEffect } from 'react'

const useEnhanceLocalStorageStateBase =
  typeof window === 'undefined'
    ? function fn<T>(
        key: string,
        defaultValue: T
      ): [T, (value?: T | ((previousState: T) => T)) => void] {
        return [defaultValue, () => {}]
      }
    : useLocalStorageState

function useEnhanceLocalStorageState<T>(
  key: string,
  defaultValue: T
): [T, (value?: T | ((previousState: T) => T)) => void] {
  const [state, setState] = useEnhanceLocalStorageStateBase(key, defaultValue)

  useEffect(() => {
    if (
      JSON.stringify(state) !== localStorage.getItem(key) &&
      localStorage.getItem(key) !== null
    ) {
      setState(JSON.parse(localStorage.getItem(key)!))
    }
  })
  return [state, setState]
}
export default useEnhanceLocalStorageState
