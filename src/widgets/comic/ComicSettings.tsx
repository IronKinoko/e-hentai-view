import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  Select,
} from '@material-ui/core'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { ComicConfigProps, useComicConfigState } from './ComicConfig'
/**
 * comic setting ui
 */
const ComicSettings: React.FC<{ onChange?: () => void }> = ({ onChange }) => {
  const [t] = useTranslation()
  const [config, setConfig] = useComicConfigState()

  const handleToggleButton = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setConfig((t) => {
      const direction = event.target.value as ComicConfigProps['direction']
      t.direction = direction
      return { ...t }
    })
    onChange?.()
  }
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
            >
              <MenuItem value="ltr">{t('LTR')}</MenuItem>
              <MenuItem value="rtl">{t('RTL')}</MenuItem>
              <MenuItem value="vertical">{t('Vertical')}</MenuItem>
            </Select>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  )
}

export default ComicSettings
