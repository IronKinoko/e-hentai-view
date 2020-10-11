import React, { useState } from 'react'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useRouter } from 'next/router'
import { axios } from 'apis'
import message from 'components/message'
import { useTranslation, Router } from 'i18n'

const Logout = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [t] = useTranslation()
  const logout = async () => {
    await axios.post('/api/user/logout')
    message.success('logout success')
    Router.push('/signin')
  }

  return (
    <>
      <ListItem button onClick={() => setOpen(true)}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary={t('EH.Logout')} />
      </ListItem>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t('EH.Logout')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('EH.Logout.Content')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>{t('Cancel')}</Button>
          <Button color="secondary" onClick={logout}>
            {t('EH.Logout')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Logout
