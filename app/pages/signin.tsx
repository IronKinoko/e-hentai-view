import React, { useState, useEffect } from 'react'
import { login, UserPayload, axios } from 'apis'
import message from 'components/message'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  Tabs,
  Tab,
  Container,
  Typography,
  Avatar,
  CircularProgress,
  Backdrop,
  AppBar,
  Button,
  Box,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Login from '@/signin/Login'
import CookieLogin from '@/signin/CookieLogin'
import { cache } from 'swr'
import { useTranslation, Trans } from 'i18n'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
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
  appBar: {
    margin: theme.spacing(1, 0),
  },
}))

const TabPanel: React.FC<{ value: any; index: any }> = ({
  value,
  index,
  children,
}) => {
  return <div hidden={value !== index}>{children}</div>
}
const SignIn: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [t] = useTranslation()
  let index = router.query.mode === 'cookie' ? 1 : 0
  useEffect(() => {
    cache.clear()
    return () => {
      cache.clear()
    }
  }, [])
  const onSubmit = async (payload: UserPayload) => {
    try {
      setLoading(true)
      payload.method = index === 1 ? 'cookie' : undefined
      let res = await login(payload)
      setLoading(false)
      if (!res.error) {
        message.success(res.message)
        router.replace('/')
      } else {
        message.error(res.message)
      }
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography variant="h5" component="h6" gutterBottom>
          EHentaiView
        </Typography>
        <Typography component="h1" variant="h5" gutterBottom>
          {t('Sign In')}
        </Typography>
        <Box m="16px 0">
          <Alert severity="warning">
            <Trans i18nKey="Sign In.info">
              Due to browser security restrictions, you must log in to the
              <Link
                prefetch={false}
                href="https://forums.e-hentai.org/index.php"
                target="_blank"
              >
                {' exhentai '}
              </Link>
              site in the current browser to view pictures normally
            </Trans>
          </Alert>
        </Box>

        <TabPanel index={0} value={index}>
          <Login onSubmit={onSubmit} />
        </TabPanel>
        <TabPanel index={1} value={index}>
          <CookieLogin onSubmit={onSubmit} />
        </TabPanel>
        <Backdrop open={loading} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    </Container>
  )
}

export default SignIn

SignIn.getInitialProps = () => {
  return {}
}
