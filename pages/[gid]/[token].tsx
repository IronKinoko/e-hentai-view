import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { GetServerSideProps } from 'next'
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

const Detail: React.FC = () => {
  const router = useRouter()
  const gid = router.query.gid as string
  const token = router.query.token as string

  const { data } = useGallery({ url: `/${gid}/${token}` })
  const classes = useStyles()
  const selectionRef = useSelection<HTMLHeadingElement>()
  const selectionRef2 = useSelection<HTMLHeadingElement>()

  const download = () => {
    // if (data && data.list.length > 0) {
    //   Page.DownloadAllImg(
    //     { record: data.info, tagList: data.tagList },
    //     data.list
    //   )
    // }
  }

  if (!data || data.error) {
    return (
      <Layout title="Loading...">
        <div className={classes.loadingContainer}>
          <CircularProgress />
          <div>Loading...</div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title={data.info.title}>
      <Card className={classes.root}>
        <Hidden smDown>
          {data.info.thumb ? (
            <div className={classes.center}>
              <LoadMedia
                className={clsx(classes.cover)}
                src={data.info.thumb}
              />
            </div>
          ) : (
            <Skeleton
              variant="rect"
              animation="wave"
              width={240}
              height={320}
            />
          )}
        </Hidden>
        <CardContent className={classes.details}>
          <Typography
            variant="subtitle1"
            component="h6"
            gutterBottom
            align="center"
            ref={selectionRef}
          >
            {data.info.title_jpn}
          </Typography>
          <Typography
            variant="subtitle2"
            component="h5"
            gutterBottom
            align="center"
            ref={selectionRef2}
          >
            {data.info.title}
          </Typography>
          <Divider variant="fullWidth" className={classes.divider} />
          <Box display="flex" className={classes.infoContainer}>
            <InfoCard record={data.info} />
            <div className={classes.border}>
              <TagList tagList={data.tagList} />
            </div>
            <div>
              <Button
                onClick={download}
                disabled
                variant="text"
                color="primary"
              >
                download
              </Button>
            </div>
          </Box>
        </CardContent>
      </Card>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: {} }
}
