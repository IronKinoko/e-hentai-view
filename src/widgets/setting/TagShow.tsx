import SlideUpDialog from '@/components/SlideUpDialog'
import useGalleryConfig from '@/hooks/useGalleryConfig'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'next-i18next'
import React, { useState } from 'react'

const useStyles = makeStyles(() =>
  createStyles({
    icon: {
      border: '2px solid currentColor',
      borderRadius: 4,
      padding: '1px 2px',
      fontSize: 12,
      lineHeight: '12px',
      letterSpacing: 0,
      color: 'currentColor',
      fontWeight: 'bold',
      marginLeft: -1,
    },
  })
)

const showTagList = [
  { value: true, label: 'ShowTag.All' },
  { value: 'watched', label: 'ShowTag.Watched' },
  { value: false, label: 'ShowTag.Hidden' },
]

const TagShow = () => {
  const [config] = useGalleryConfig()
  const classes = useStyles()
  const [t] = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <>
      <ListItem button onClick={() => setOpen(true)}>
        <ListItemIcon>
          <div className={classes.icon}>Tag</div>
        </ListItemIcon>
        <ListItemText
          primary={t('ShowTag')}
          secondary={
            config.showTag === 'watched'
              ? t('ShowTag.Watched')
              : config.showTag
              ? t('ShowTag.All')
              : config.showTag === false
              ? t('ShowTag.Hidden')
              : ''
          }
        />
      </ListItem>
      <ShowTagSlideUpDialog open={open} setOpen={setOpen} />
    </>
  )
}

export const ShowTagSlideUpDialog: React.FC<{
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}> = ({ open, setOpen }) => {
  const [t] = useTranslation()
  const [config, setConfig] = useGalleryConfig()

  return (
    <SlideUpDialog open={open} onClose={() => setOpen(false)}>
      <List>
        {showTagList.map(({ label, value }) => (
          <ListItem
            button
            key={label}
            onClick={() => {
              setConfig({ ...config, showTag: value as boolean | 'watched' })
              setOpen(false)
            }}
          >
            <ListItemIcon>
              <Radio checked={value === config.showTag} />
            </ListItemIcon>
            <ListItemText primary={t(label)} />
          </ListItem>
        ))}
      </List>
    </SlideUpDialog>
  )
}

export default TagShow
