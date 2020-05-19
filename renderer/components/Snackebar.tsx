import React, { SyntheticEvent } from 'react'
import clsx from 'clsx'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import { amber, green } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles, Theme } from '@material-ui/core/styles'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const useStyles1 = makeStyles((theme: Theme) => ({
  success: {
    backgroundColor: green[600],
    color: '#fff',
  },
  error: {
    backgroundColor: theme.palette.error.dark,
    color: '#fff',
  },
  info: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  warning: {
    backgroundColor: amber[700],
    color: '#fff',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export interface Props {
  className?: string
  message?: React.ReactNode
  onClose?: () => void
  variant: keyof typeof variantIcon
}

function MySnackbarContentWrapper(props: Props) {
  const classes = useStyles1()
  const { className, message, onClose, variant, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  )
}

interface SnackbarWrapProps {
  duration: number
  variant: 'error' | 'success' | 'info' | 'warning'
  message: string
}
const MessageSnackbar: React.FC<SnackbarWrapProps> = (props) => {
  const [open, setOpen] = React.useState(true)
  const { variant, duration, message } = props
  const handleClose = (_event?: SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={open}
        autoHideDuration={duration}
        onClose={handleClose}>
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={variant}
          message={message}
        />
      </Snackbar>
    </div>
  )
}

export default MessageSnackbar
