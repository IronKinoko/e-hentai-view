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

const UserCookie = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <ListItem button onClick={() => setOpen(true)}>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="User Cookie" />
      </ListItem>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>User Cookie</DialogTitle>
        <DialogContent>
          <DialogContentText color="primary" variant="h6">
            KEEP IT SAFE
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
            COPY
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default UserCookie
