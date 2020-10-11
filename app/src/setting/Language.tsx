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
import { languageMap } from 'constant'

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
      <LanguageSlideUpDialog open={open} setOpen={setOpen} />
    </>
  )
}

export const LanguageSlideUpDialog: React.FC<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ open, setOpen }) => {
  const [t, i18n] = useTranslation()

  return (
    <SlideUpDialog open={open} onClose={() => setOpen(false)}>
      <List>
        {Object.entries(languageMap).map(([code, languageName]) => (
          <ListItem
            button
            key={code}
            onClick={() => {
              i18n.changeLanguage(code)
              localStorage.setItem('i18n', code)
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
  )
}

export default Language
