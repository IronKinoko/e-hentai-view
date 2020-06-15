import { NextPage } from 'next'
import {
  Grid,
  Box,
  Card,
  Divider,
  CardContent,
  Typography,
  CardActionArea,
  Button,
  Hidden,
  CircularProgress,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Skeleton, SpeedDial } from '@material-ui/lab'
import Layout from 'components/Layout'
import LoadMedia from 'components/LoadMedia'
import { useRouter } from 'next/router'
import CommentList from 'src/detail/CommentList'
import clsx from 'clsx'
import InfoCard from '@/detail/InfoCard'
import useGallery from 'hooks/useGallery'
import useSelection from 'hooks/useSelection'
import TagList from '@/detail/TagList'
import PageList from '@/detail/PageList'
import Info from '@/detail/Info'
import Loading from 'components/Loading'
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
    divider: { margin: theme.spacing(1, 0) },

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

  const { data } = useGallery({ url: `/${gid}/${token}` })
  const classes = useStyles()

  if (!data || data.error) {
    return (
      <Layout title="Loading..." fullScreen>
        <Loading />
      </Layout>
    )
  }

  return (
    <Layout title={data.info.title} gutterBottom>
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
