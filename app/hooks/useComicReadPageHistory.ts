import React from 'react'
import { LOCAL_COMIC_READ_PAGE_HISTORY } from 'constant'
import useEnhanceLocalStorageState from './useEnhanceLocalStorageState'
export default function useComicReadPageHistory() {
  return useEnhanceLocalStorageState<{ [pageKey: string]: number }>(
    LOCAL_COMIC_READ_PAGE_HISTORY,
    {}
  )
}
