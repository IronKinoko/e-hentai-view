import React from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { useTranslation } from 'i18n'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useComicConfigState, ComicConfigProps } from './ComicConfig'
/**
 * comic setting ui
 */
const ComicSettings: React.FC<{ onChange?: () => void }> = ({ onChange }) => {
  const [t] = useTranslation()
  const [config, setConfig] = useComicConfigState()

  const handleToggleButton = (_: any, v: ComicConfigProps['direction']) => {
    setConfig((t) => {
      if (!v) return t
      t.direction = v
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
            <ToggleButtonGroup
              value={config.direction}
              onChange={handleToggleButton}
              exclusive
            >
              <ToggleButton value="ltr">{t('LTR')}</ToggleButton>
              {/* <ToggleButton value="rtl">{t('RTL')}</ToggleButton> */}
              <ToggleButton value="vertical">{t('Vertical')}</ToggleButton>
            </ToggleButtonGroup>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  )
}

export default ComicSettings
