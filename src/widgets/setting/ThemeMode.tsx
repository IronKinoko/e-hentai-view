import SlideUpDialog from '@/components/SlideUpDialog'
import { useThemeState } from '@/theme'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

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
          {theme.palette.mode === 'dark' ? (
            <Brightness4Icon />
          ) : (
            <Brightness7Icon />
          )}
        </ListItemIcon>
        <ListItemText
          primary={t('Theme')}
          secondary={t('Theme.' + theme.palette.mode)}
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
