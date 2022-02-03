import { useMediaQuery } from '@mui/material'
import { blue, pink } from '@mui/material/colors'
import {
  createTheme,
  darken,
  StyledEngineProvider,
  Theme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'
import React, {
  createContext,
  FC,
  Reducer,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

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
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: paletteType,
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
      components: {
        MuiAppBar: {
          styleOverrides:
            paletteType === 'dark'
              ? { colorPrimary: { color: '#fff', backgroundColor: '#333' } }
              : {
                  colorPrimary: {
                    backgroundColor: '#fff',
                    color: 'rgba(0,0,0,0.54)',
                  },
                },
        },
        MuiButton: {
          styleOverrides:
            paletteType === 'light' ? { root: { color: '#555' } } : {},
        },
      },
    })
  }, [paletteType])

  const matches = useMediaQuery(theme.breakpoints.down('sm'), {
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

    const themeColorMeta = document.querySelector('meta[name=theme-color]')
    const color = newPaletteType === 'dark' ? '#121212' : '#fff'
    themeColorMeta?.setAttribute('content', color)
    dispatch({ type: 'CHANGE', payload: { paletteType: newPaletteType } })
  }, [isDarkMode])

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <DispatchContext.Provider value={dispatch}>
          <IsMobile.Provider value={matches}>{children}</IsMobile.Provider>
        </DispatchContext.Provider>
      </MuiThemeProvider>
    </StyledEngineProvider>
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
