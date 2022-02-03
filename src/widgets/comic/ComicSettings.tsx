import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
  SelectProps,
  Switch,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { ComicConfigProps, useComicConfigState } from './ComicConfig'

/**
 * comic setting ui
 */
const ComicSettings: React.FC<{ onChange?: () => void }> = ({ onChange }) => {
  const [t] = useTranslation()
  const [config, setConfig] = useComicConfigState()

  const handleToggleButton: SelectProps['onChange'] = (event) => {
    setConfig((t) => {
      const direction = event.target.value as ComicConfigProps['direction']
      t.direction = direction
      return { ...t }
    })
    onChange?.()
  }

  const isVertical = config.direction === 'vertical'

  return (
    <div>
      <List>
        <ListItem>
          <ListItemText>{t('Direction')}</ListItemText>
          <ListItemSecondaryAction>
            <Select
              value={config.direction}
              onChange={handleToggleButton}
              disableUnderline
              variant="standard"
            >
              <MenuItem value="ltr">{t('LTR')}</MenuItem>
              <MenuItem value="rtl">{t('RTL')}</MenuItem>
              <MenuItem value="vertical">{t('Vertical')}</MenuItem>
            </Select>
          </ListItemSecondaryAction>
        </ListItem>
        {!isVertical && (
          <ListItem>
            <ListItemText>{t('imgFit')}</ListItemText>
            <ListItemSecondaryAction>
              <Switch
                checked={config.imgFit}
                onChange={(e) =>
                  setConfig((t) => ({ ...t, imgFit: e.target.checked }))
                }
              />
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default ComicSettings
