import React, { createContext, useContext } from 'react'
import useEnhanceLocalStorageState from '@/hooks/useEnhanceLocalStorageState'
import { LOCAL_COMIC_CONFIG } from '@/constant'

export interface ComicConfigProps {
  direction?: 'ltr' | 'rtl' | 'vertical'
}

const defualtComicConfig: ComicConfigProps = {
  direction: 'vertical',
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
