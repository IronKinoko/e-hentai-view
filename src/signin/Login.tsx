import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField, Button } from '@material-ui/core'
import { useForm, OnSubmit } from 'react-hook-form'
import { UserPayload } from 'apis'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  })
)
const Login: React.FC<{ onSubmit: OnSubmit<UserPayload> }> = ({ onSubmit }) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm<UserPayload>()
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="UserName"
        label="Email Address"
        name="UserName"
        autoComplete="UserName"
        autoFocus
        inputRef={register}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="PassWord"
        label="Password"
        type="Password"
        id="PassWord"
        autoComplete="current-password"
        inputRef={register}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign In
      </Button>
    </form>
  )
}

export default Login
