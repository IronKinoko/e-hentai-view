import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import ErrorIcon from '@mui/icons-material/Error'
import InfoIcon from '@mui/icons-material/Info'
import WarningIcon from '@mui/icons-material/Warning'
import { amber, green } from '@mui/material/colors'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import SnackbarContent from '@mui/material/SnackbarContent'
import { Theme } from '@mui/material/styles'
import makeStyles from '@mui/styles/makeStyles'
import clsx from 'clsx'
import React from 'react'

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
          onClick={onClose}
          size="large"
        >
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
  const handleClose = (_?: any, reason?: string) => {
    if (reason === 'clickaway') return

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
        onClose={handleClose}
      >
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
