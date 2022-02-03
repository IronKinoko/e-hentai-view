import { login, UserPayload } from '@/apis'
import message from '@/components/message'
import { languageMap } from '@/constant'
import { LanguageSlideUpDialog } from '@/widgets/setting/Language'
import CookieLogin from '@/widgets/signin/CookieLogin'
import Login from '@/widgets/signin/Login'
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  MobileStepper,
  Typography,
} from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import TranslateIcon from '@mui/icons-material/Translate'
import { Alert } from '@mui/material'
import { NextPage } from 'next'
import { Trans, useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { cache } from 'swr'

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
  const [open, setOpen] = useState(false)
  const [t, i18n] = useTranslation()
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            EHentaiView
            <Button startIcon={<TranslateIcon />} onClick={() => setOpen(true)}>
              {languageMap[i18n.language]}
            </Button>
          </Box>
        </Typography>

        <Typography component="h1" variant="h5" gutterBottom>
          {t('SignIn')}
        </Typography>
        <Box m="16px 0">
          <Alert severity="warning">
            <Trans i18nKey="SignIn.info">
              Due to browser security restrictions, you must log in to the
              <Link
                href="https://forums.e-hentai.org/index.php"
                target="_blank"
                underline="hover"
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
              href="https://forums.e-hentai.org/index.php"
              target="_blank"
              underline="hover"
            >
              {' e-hentai.org '}
              <OpenInNewIcon fontSize="inherit" />
            </Link>
          </Typography>
        ) : activeStep === 1 ? (
          <Typography variant="subtitle1" gutterBottom>
            {`2. ${t('SignIn')}`}
            <Link href="https://exhentai.org" target="_blank" underline="hover">
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
      <LanguageSlideUpDialog open={open} setOpen={setOpen} />
    </Container>
  )
}

export default SignIn

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
