import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography } from '@material-ui/core'
import Link from '@/components/Link'
import { useForm, Controller } from 'react-hook-form'
import { UserPayload } from '@/apis'
import { useTranslation } from 'next-i18next'

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

const Login: React.FC<{ onSubmit: (v: UserPayload) => any }> = ({
  onSubmit,
}) => {
  const classes = useStyles()
  const { handleSubmit, control } = useForm<UserPayload>()
  const [t] = useTranslation()

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Controller
        name="UserName"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('SignIn.EmailAddress')}
            autoComplete="UserName"
            autoFocus
            {...field}
          />
        )}
      />
      <Controller
        name="PassWord"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            required
            fullWidth
            label={t('SignIn.Password')}
            type="Password"
            id="PassWord"
            autoComplete="current-password"
            {...field}
          />
        )}
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
