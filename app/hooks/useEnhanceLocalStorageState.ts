import { useLocalStorageState } from '@umijs/hooks'

const useEnhanceLocalStorageState =
  typeof window === 'undefined'
    ? function fn<T>(
        key: string,
        defaultValue: T
      ): [T, (value?: T | ((previousState: T) => T)) => void] {
        return [defaultValue, () => {}]
      }
    : useLocalStorageState

export default useEnhanceLocalStorageState
