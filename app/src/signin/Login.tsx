import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography } from '@material-ui/core'
import Link from 'components/Link'
import { useForm, OnSubmit } from 'react-hook-form'
import { UserPayload } from 'apis'
import { useTranslation } from 'i18n'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      fontSize: 'large',
      boxShadow: theme.shadows[16],
    },
  })
)
const Login: React.FC<{ onSubmit: OnSubmit<UserPayload> }> = ({ onSubmit }) => {
  const classes = useStyles()
  const { register, handleSubmit } = useForm<UserPayload>()
  const [t] = useTranslation()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="UserName"
        label={t('SignIn.EmailAddress')}
        name="UserName"
        autoComplete="UserName"
        autoFocus
        inputRef={register}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="PassWord"
        label={t('SignIn.Password')}
        type="Password"
        id="PassWord"
        autoComplete="current-password"
        inputRef={register}
      />
      <Typography align="right">
        <Link href="/signin?mode=cookie">{t('SignIn.Cookie')}</Link>
      </Typography>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {t('SignIn')}
      </Button>
    </form>
  )
}

export default Login
