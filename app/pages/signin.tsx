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
  Stepper,
  MobileStepper,
  Paper,
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Login from '@/signin/Login'
import CookieLogin from '@/signin/CookieLogin'
import { cache } from 'swr'
import { useTranslation, Trans } from 'i18n'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
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
  const [activeStep, setActiveStep] = useState(0)
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

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography variant="h4" component="h6" gutterBottom>
          EHentaiView
        </Typography>
        <Typography component="h1" variant="h5" gutterBottom>
          {t('SignIn')}
        </Typography>
        <Box m="16px 0">
          <Alert severity="warning">
            <Trans i18nKey="SignIn.info">
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

        <MobileStepper
          position="static"
          style={{ margin: '0 -16px' }}
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              startIcon={<KeyboardArrowLeftIcon />}
            >
              {t('Back')}
            </Button>
          }
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === 2}
              endIcon={<KeyboardArrowRightIcon />}
            >
              {t('Next')}
            </Button>
          }
          steps={3}
          activeStep={activeStep}
        />

        {activeStep === 0 ? (
          <Typography variant="subtitle1" gutterBottom>
            {`1. ${t('SignIn')}`}
            <Link
              prefetch={false}
              href="https://forums.e-hentai.org/index.php"
              target="_blank"
            >
              {' e-hentai.org '}
              <OpenInNewIcon fontSize="inherit" />
            </Link>
          </Typography>
        ) : activeStep === 1 ? (
          <Typography variant="subtitle1" gutterBottom>
            {`2. ${t('SignIn')}`}
            <Link prefetch={false} href="https://exhentai.org" target="_blank">
              {' exhentai.org '}
              <OpenInNewIcon fontSize="inherit" />
            </Link>
          </Typography>
        ) : activeStep === 2 ? (
          <>
            <TabPanel index={0} value={index}>
              <Login onSubmit={onSubmit} />
            </TabPanel>
            <TabPanel index={1} value={index}>
              <CookieLogin onSubmit={onSubmit} />
            </TabPanel>
          </>
        ) : null}

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
