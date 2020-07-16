import React, { useEffect } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { TextField, Button, Typography } from '@material-ui/core'
import { useForm, OnSubmit } from 'react-hook-form'
import { UserPayload } from 'apis'
import { useLocalStorageState } from '@umijs/hooks'
import { useTranslation } from 'i18n'
import Link from 'components/Link'
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
const CookieLogin: React.FC<{ onSubmit: OnSubmit<UserPayload> }> = ({
  onSubmit,
}) => {
  const classes = useStyles()
  const { register, handleSubmit, setValue } = useForm<UserPayload>({})
  const [t] = useTranslation()

  useEffect(() => {
    const v = localStorage.getItem('cookie')
    if (v) {
      Object.entries(JSON.parse(v) as UserPayload).forEach(([key, value]) => {
        setValue(key, value)
      })
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
      <TextField
        margin="normal"
        required
        fullWidth
        id="ipb_member_id"
        label="ipb_member_id"
        name="ipb_member_id"
        autoComplete="ipb_member_id"
        autoFocus
        inputRef={register}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="ipb_pass_hash"
        label="ipb_pass_hash"
        id="ipb_pass_hash"
        inputRef={register}
      />
      <TextField
        margin="normal"
        fullWidth
        name="igneous"
        label="igneous"
        id="igneous"
        inputRef={register}
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
