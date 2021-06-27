import React, { useState } from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { useTranslation } from 'next-i18next'
import message from '@/components/message'

const UserCookie = () => {
  const [t] = useTranslation()
  const [open, setOpen] = useState(false)
  return (
    <>
      <ListItem button onClick={() => setOpen(true)}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary={t('EH.UserCookie')} />
      </ListItem>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t('EH.UserCookie')}</DialogTitle>
        <DialogContent>
          <DialogContentText color="secondary" variant="h6">
            {t('EH.KeepItSafe')}
          </DialogContentText>
          {typeof window !== 'undefined' &&
            document.cookie.split(';').map((t) => (
              <DialogContentText key={t}>
                <Typography component="span" variant="body2">
                  {t.replace('=', ': ')}
                </Typography>
              </DialogContentText>
            ))}
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              setOpen(false)
              copy(document.cookie.replace(/=/g, ': ').replace(/;\s?/g, '\n'))
            }}
          >
            {t('Copy')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserCookie

function copy(s: string): void {
  const textarea = document.createElement('textarea')
  textarea.readOnly = true
  textarea.value = s
  textarea.style.width = '0'
  textarea.style.height = '0'
  textarea.style.position = 'fixed'
  textarea.style.top = '0'
  textarea.style.left = '0'
  textarea.style.overflow = 'hidden'
  textarea.style.resize = 'none'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  setTimeout(() => {
    textarea.setSelectionRange(0, s.length)
    textarea.select()
    if (document.execCommand('copy')) {
      message.success('Copied')
    } else {
      message.error('复制失败')
    }
    document.body.removeChild(textarea)
  })
}
