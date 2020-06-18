import React, { useState } from 'react'
import TranslateIcon from '@material-ui/icons/Translate'
import { useTranslation } from 'i18n'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Radio,
} from '@material-ui/core'
import SlideUpDialog from 'components/SlideUpDialog'

const languageMap: { [k: string]: string } = {
  en: 'English',
  zh: '简体中文',
}
const Language = () => {
  const [t, i18n] = useTranslation()
  const [open, setOpen] = useState(false)
  return (
    <>
      <ListItem button onClick={() => setOpen(true)}>
        <ListItemIcon>
          <TranslateIcon />
        </ListItemIcon>
        <ListItemText
          primary={t('Language')}
          secondary={languageMap[i18n.language]}
        />
      </ListItem>
      <SlideUpDialog open={open} onClose={() => setOpen(false)}>
        <List>
          {Object.entries(languageMap).map(([code, languageName]) => (
            <ListItem
              button
              key={code}
              onClick={() => {
                i18n.changeLanguage(code)
                setOpen(false)
              }}
            >
              <ListItemIcon>
                <Radio checked={code === i18n.language} />
              </ListItemIcon>
              <ListItemText primary={languageName} />
            </ListItem>
          ))}
        </List>
      </SlideUpDialog>
    </>
  )
}

export default Language
