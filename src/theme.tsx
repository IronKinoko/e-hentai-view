import { useMediaQuery } from '@material-ui/core'
import { blue, pink } from '@material-ui/core/colors'
import { enUS, zhCN } from '@material-ui/core/locale'
import {
  createMuiTheme,
  darken,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import { useTranslation } from 'next-i18next'
import React, {
  createContext,
  FC,
  Reducer,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'

export const DispatchContext = createContext<React.Dispatch<Action>>(() => {})
export const IsMobile = createContext<boolean | null>(null)
export type Action = { type: 'CHANGE'; payload: any }
export interface InitialThemeOptionsProps {
  paletteType: 'dark' | 'light'
}
const InitialThemeOptions: InitialThemeOptionsProps = {
  paletteType: 'light',
}
const ThemeProvider: FC<{}> = ({ children }) => {
  const [themeOptions, dispatch] = useReducer<
    Reducer<InitialThemeOptionsProps, Action>
  >((state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          paletteType: action.payload.paletteType,
        }
      default:
        return state
    }
  }, InitialThemeOptions)

  const { paletteType } = themeOptions
  const [, i18n] = useTranslation()
  const theme = useMemo(() => {
    return createMuiTheme(
      {
        palette: {
          type: paletteType,
          primary: {
            main: paletteType === 'light' ? blue[700] : blue[200],
          },
          secondary: {
            main: paletteType === 'light' ? darken(pink.A400, 0.1) : pink[200],
          },
          background: {
            default: paletteType === 'light' ? '#fff' : '#121212',
          },
        },
        overrides: {
          MuiAppBar:
            paletteType === 'dark'
              ? { colorPrimary: { color: '#fff', backgroundColor: '#333' } }
              : {
                  colorPrimary: {
                    backgroundColor: '#fff',
                    color: 'rgba(0,0,0,0.54)',
                  },
                },
          MuiButton: paletteType === 'light' ? { root: { color: '#555' } } : {},
        },
      },
      i18n.language === 'zh' ? zhCN : enUS
    )
  }, [i18n.language, paletteType])

  const matches = useMediaQuery(theme.breakpoints.down('xs'), {
    defaultMatches: true,
  })
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)', {
    noSsr: true,
  })

  useEffect(() => {
    let newPaletteType = localStorage.getItem('paletteType') as
      | InitialThemeOptionsProps['paletteType']
      | null
    newPaletteType = newPaletteType
      ? newPaletteType
      : isDarkMode
      ? 'dark'
      : 'light'
    dispatch({ type: 'CHANGE', payload: { paletteType: newPaletteType } })
  }, [isDarkMode])
  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>
        <IsMobile.Provider value={matches}>{children}</IsMobile.Provider>
      </DispatchContext.Provider>
    </MuiThemeProvider>
  )
}

export default ThemeProvider

export function useThemeState() {
  const dispatch = useContext(DispatchContext)
  return dispatch
}
export function useIsmobile() {
  const matches = useContext(IsMobile)
  return matches
}
