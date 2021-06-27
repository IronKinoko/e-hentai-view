import { UserPayload } from '@/apis'
import Link from '@/components/Link'
import { Button, TextField, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
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
const CookieLogin: React.FC<{ onSubmit: (v: UserPayload) => any }> = ({
  onSubmit,
}) => {
  const classes = useStyles()
  const { handleSubmit, setValue, control } = useForm<UserPayload>({})
  const [t] = useTranslation()

  useEffect(() => {
    const v = localStorage.getItem('cookie')
    if (v) {
      Object.entries(JSON.parse(v) as UserPayload).forEach(([key, value]) =>
        // @ts-ignore
        setValue(key, value)
      )
    }
  }, [setValue])
  return (
    <form
      onSubmit={handleSubmit((v) => {
        localStorage.setItem('cookie', JSON.stringify(v))
        onSubmit(v)
      })}
      className={classes.form}
    >
      <Controller
        name="ipb_member_id"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            required
            fullWidth
            id="ipb_member_id"
            label="ipb_member_id"
            autoComplete="ipb_member_id"
            autoFocus
            {...field}
          />
        )}
      />

      <Controller
        name="ipb_pass_hash"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            required
            fullWidth
            label="ipb_pass_hash"
            id="ipb_pass_hash"
            {...field}
          />
        )}
      />

      <Controller
        name="igneous"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            fullWidth
            label="igneous"
            id="igneous"
            {...field}
          />
        )}
      />

      <Typography align="right">
        <Link href="/signin">{t('SignIn.Email')}</Link>
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

export default CookieLogin
