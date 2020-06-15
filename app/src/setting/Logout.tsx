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

const Logout = () => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const logout = async () => {
    await axios.post('/api/user/logout')
    message.success('logout success')
    router.push('/signin')
  }

  return (
    <>
      <ListItem button onClick={() => setOpen(true)}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>CANCEL</Button>
          <Button color="secondary" onClick={logout}>
            LOGOUT
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Logout
