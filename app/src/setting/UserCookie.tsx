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
import { useTranslation } from 'i18n'

const UserCookie = () => {
  const [t] = useTranslation()
  const [open, setOpen] = useState(false)
  return (
    <>
      <ListItem button onClick={() => setOpen(true)}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary={t('EH.User Cookie')} />
      </ListItem>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t('EH.User Cookie')}</DialogTitle>
        <DialogContent>
          <DialogContentText color="secondary" variant="h6">
            {t('EH.KEEP IT SAFE')}
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
          <Button color="primary" onClick={() => setOpen(false)}>
            {t('Copy')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserCookie
