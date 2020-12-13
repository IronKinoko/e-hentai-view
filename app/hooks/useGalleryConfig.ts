import { GALLERY_CONFIG } from 'constant'
import React from 'react'
import useEnhanceLocalStorageState from './useEnhanceLocalStorageState'

const defualtConfig: {
  /** showTag `false: none` `true: all` `watched: only watched` */
  showTag: boolean | 'watched'
} = { showTag: 'watched' }

export default function useGalleryConfig() {
  return useEnhanceLocalStorageState(GALLERY_CONFIG, defualtConfig)
}
