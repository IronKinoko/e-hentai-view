import React, { useContext, useState } from 'react'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { useTranslation } from 'i18n'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { useThemeState } from '@/theme'
import SlideUpDialog from 'components/SlideUpDialog'

const ThemeMode = () => {
  const theme = useTheme()
  const [t] = useTranslation()
  const dispatch = useThemeState()
  const [open, setOpen] = useState(false)
  const mode =
    typeof window === 'undefined'
      ? 'auto'
      : localStorage.getItem('paletteType') || 'auto'
  return (
    <>
      <ListItem
        button
        onClick={() => {
          setOpen(true)
        }}
      >
        <ListItemIcon>
          {theme.palette.type === 'dark' ? (
            <Brightness4Icon />
          ) : (
            <Brightness7Icon />
          )}
        </ListItemIcon>
        <ListItemText
          primary={t('Theme')}
          secondary={t('Theme.' + theme.palette.type)}
        />
      </ListItem>
      <SlideUpDialog open={open} onClose={() => setOpen(false)}>
        <List>
          {['auto', 'light', 'dark'].map((paletteType) => (
            <ListItem
              button
              key={paletteType}
              onClick={() => {
                if (paletteType === 'auto') {
                  localStorage.removeItem('paletteType')
                } else {
                  localStorage.setItem('paletteType', paletteType)
                }

                dispatch({
                  type: 'CHANGE',
                  payload: {
                    paletteType:
                      paletteType === 'auto'
                        ? getSystemThemeMode()
                        : paletteType,
                  },
                })
                setOpen(false)
              }}
            >
              <ListItemIcon>
                <Radio checked={mode === paletteType} />
              </ListItemIcon>
              <ListItemText primary={t(`Theme.${paletteType}`)} />
            </ListItem>
          ))}
        </List>
      </SlideUpDialog>
    </>
  )
}

export default ThemeMode

function getSystemThemeMode() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches

  return isDarkMode ? 'dark' : 'light'
}
