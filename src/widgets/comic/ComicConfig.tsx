import React, { createContext, useContext } from 'react'
import useEnhanceLocalStorageState from '@/hooks/useEnhanceLocalStorageState'
import { LOCAL_COMIC_CONFIG } from '@/constant'

export interface ComicConfigProps {
  /**
   * comic direction
   */
  direction?: 'ltr' | 'rtl' | 'vertical'
  /**
   * horizontal mode image fit width/height
   */
  imgFit?: boolean
}

const defualtComicConfig: ComicConfigProps = {
  direction: 'vertical',
  imgFit: true,
}

const ComicConfigContext = createContext<
  [
    ComicConfigProps,
    (
      value:
        | ComicConfigProps
        | ((previousState: ComicConfigProps) => ComicConfigProps)
    ) => void
  ]
>([defualtComicConfig, () => {}])

const ComicConfig: React.FC = ({ children }) => {
  const [config, setConfig] = useEnhanceLocalStorageState<ComicConfigProps>(
    LOCAL_COMIC_CONFIG,
    defualtComicConfig
  )

  return (
    <ComicConfigContext.Provider value={[config, setConfig]}>
      {children}
    </ComicConfigContext.Provider>
  )
}

export default ComicConfig

export function useComicConfigState() {
  return useContext(ComicConfigContext)
}
