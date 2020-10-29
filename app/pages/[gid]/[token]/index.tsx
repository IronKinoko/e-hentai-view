import React from 'react'
import Info from '@/detail/Info'
import PageList from '@/detail/PageList'
import { Divider } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Layout from 'components/Layout'
import Loading from 'components/Loading'
import useGallery from 'hooks/useGallery'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import CommentList from 'src/detail/CommentList'
import { useTranslation } from 'i18n'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      flex: '1',
    },

    cover: {
      margin: theme.spacing(0, 'auto'),
      maxHeight: 320,
    },
    center: {
      display: 'flex',
      alignItems: 'center',
    },
    divider: { margin: theme.spacing(0, 0, 1) },

    border: {
      borderStyle: 'solid',
      borderColor: theme.palette.divider,
      borderWidth: '0 1px',
      flex: 1,
      padding: theme.spacing(0, 1),
      margin: theme.spacing(0, 1),
      [theme.breakpoints.down('sm')]: {
        borderWidth: '1px 0',
        padding: theme.spacing(1, 0),
        margin: theme.spacing(1, 0),
      },
    },

    infoContainer: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
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
  })
)

const Detail: NextPage = () => {
  const router = useRouter()
  const gid = router.query.gid as string
  const token = router.query.token as string
  const [t] = useTranslation()

  const { data } = useGallery({ url: `/${gid}/${token}` })
  const classes = useStyles()

  if (!data || data.error) {
    return (
      <Layout title={t('Loading') + '...'} fullScreen showBack>
        <Loading />
      </Layout>
    )
  }

  return (
    <Layout title={data.info.title} gutterBottom showBack>
      <Info info={data.info} tagList={data.tagList} />
      <CommentList commentList={data.commentList || []} />
      <Divider variant="fullWidth" className={classes.divider} />
      <PageList
        filecount={parseInt(data.info.filecount)}
        initialData={data.list}
        url={`/${gid}/${token}`}
      />
    </Layout>
  )
}

export default Detail
Detail.getInitialProps = () => ({})
