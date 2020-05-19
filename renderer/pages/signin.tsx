import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { useForm } from 'react-hook-form'
import { User, Err } from 'apis'
import message from 'components/message'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Layout from 'components/Layout'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.grey[700],
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const SignIn: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const { register, handleSubmit } = useForm<User.UserPayload>()
  const onSubmit = async (payload: User.UserPayload) => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 5000)
    let res = await User.login(payload)
    setLoading(false)
    if (res.code === Err.ErrCode.SUCCESS) {
      message.success(res.message)
      router.replace('/index?page=0')
    } else {
      message.error(res.message)
    }
  }
  return (
    <Layout title="sign in">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>E</Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.form}
            noValidate>
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
              className={classes.submit}>
              Sign In
            </Button>
          </form>
          <Backdrop open={loading} className={classes.backdrop}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </Container>
    </Layout>
  )
}

SignIn.getInitialProps = (_ctx) => {
  return {}
}

export default SignIn
