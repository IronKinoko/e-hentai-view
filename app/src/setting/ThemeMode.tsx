import React, { useContext } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { useTranslation } from 'i18n'
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { useThemeState } from '@/theme'
const ThemeMode = () => {
  const theme = useTheme()
  const [t] = useTranslation()
  const dispatch = useThemeState()
  return (
    <ListItem
      button
      onClick={() => {
        let paletteType = theme.palette.type === 'dark' ? 'light' : 'dark'
        localStorage.setItem('paletteType', paletteType)
        dispatch({ type: 'CHANGE', payload: { paletteType } })
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
  )
}

export default ThemeMode
