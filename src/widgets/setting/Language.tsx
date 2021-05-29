import React, { useState } from 'react'
import TranslateIcon from '@material-ui/icons/Translate'
import { useTranslation } from 'next-i18next'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
  Radio,
} from '@material-ui/core'
import SlideUpDialog from '@/components/SlideUpDialog'
import { languageMap } from '@/constant'
import { useRouter } from 'next/router'
import Link from '@/components/Link'

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
  const [, i18n] = useTranslation()
  const router = useRouter()
  return (
    <SlideUpDialog open={open} onClose={() => setOpen(false)}>
      <List>
        {Object.entries(languageMap).map(([code, languageName]) => (
          <Link
            naked
            href={{ pathname: router.pathname, query: router.query }}
            locale={code}
            key={code}
            replace
          >
            <ListItem
              button
              onClick={() => {
                setOpen(false)
                document.cookie = `NEXT_LOCALE=${code}; path=/;max-age=86400000;`
              }}
            >
              <ListItemIcon>
                <Radio checked={code === i18n.language} />
              </ListItemIcon>
              <ListItemText primary={languageName} />
            </ListItem>
          </Link>
        ))}
      </List>
    </SlideUpDialog>
  )
}

export default Language
