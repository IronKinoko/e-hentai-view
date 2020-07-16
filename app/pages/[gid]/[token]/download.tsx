import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import useDownload from 'hooks/useDownload'
import Layout from 'components/Layout'
import {
  LinearProgress,
  CircularProgress,
  Typography,
  Divider,
  Button,
  Collapse,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import LinearProgressWithLabel from 'components/LinearProgressWithLabel'
import Info from '@/detail/Info'
import Loading from 'components/Loading'
import { useTranslation } from 'i18n'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'calc(100vh - 93px)',
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
    divider: { margin: theme.spacing(2, 0) },
  })
)

const Download: NextPage = () => {
  const router = useRouter()
  const gid = router.query.gid as string
  const token = router.query.token as string
  const classes = useStyles()
  const [data, progess, download] = useDownload(gid, token)
  const [t] = useTranslation()
  const [saveLoading, setSaveLoading] = useState(false)
  const save = async () => {
    setSaveLoading(true)
    await download()
    setSaveLoading(false)
  }
  if (!data || data.error) {
    return (
      <Layout title="Loading..." fullScreen>
        <Loading />
      </Layout>
    )
  }
  return (
    <Layout title={t('Download')} gutterBottom>
      <Info info={data.info} tagList={data.tagList} />
      <Divider variant="fullWidth" className={classes.divider} />
      <Collapse in={progess.done === progess.total && progess.total !== 0}>
        <Button fullWidth color="primary" variant="contained" onClick={save}>
          {saveLoading ? (
            <CircularProgress color="inherit" size={24} />
          ) : (
            t('Download.SaveLocal')
          )}
        </Button>
      </Collapse>
      <Typography component="h6" variant="h6">
        {t('Download.Progress')}
        <Typography component="span" variant="caption" noWrap>
          {` (${t('Download.Done')}: ${progess.done} / ${t(
            'Download.Buffer'
          )}: ${progess.buffer - progess.done} / ${t('Download.Total')}: ${
            progess.total
          })`}
        </Typography>
      </Typography>
      <LinearProgressWithLabel
        variant="buffer"
        value={Math.round((progess.done / progess.total) * 100)}
        valueBuffer={Math.round((progess.buffer / progess.total) * 100)}
      />
      <Typography component="h6" variant="h6">
        {t('Download.ErrorInfo')}
      </Typography>
      <Typography component="pre">
        {JSON.stringify(progess.error, null, 2)}
      </Typography>
    </Layout>
  )
}

export default Download
Download.getInitialProps = () => ({})
