import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { NextPage } from 'next'
import {
  Grid,
  Box,
  Card,
  Divider,
  CardContent,
  Typography,
  Chip,
  CardActionArea,
  Container,
  Button,
  Hidden,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Skeleton, Rating, Pagination } from '@material-ui/lab'
import Layout from 'components/Layout'
import LoadMedia from 'components/LoadMedia'
import ImgRead from '@/detail/ImgRead'
import { useRouter } from 'next/router'
import CommentList from 'src/detail/CommentList'
import clsx from 'clsx'
import InfoCard from '@/detail/InfoCard'
import { useScroll, useThrottleFn } from '@umijs/hooks'
import useGallery from 'hooks/useGallery'
import useSelection from 'hooks/useSelection'
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
    content: {
      flex: '1 0 auto',
    },
    cover: {
      width: 240,
      maxHeight: 320,
      minHeight: 320,
      margin: theme.spacing(0, 'auto'),
      [theme.breakpoints.down('sm')]: {
        width: 150,
        minHeight: 200,
        maxHeight: 250,
      },
    },
    center: {
      display: 'flex',
      alignItems: 'center',
    },
    divider: { margin: theme.spacing(1, 0) },
    chip: {
      margin: theme.spacing(0, 'auto', 2),
      width: '70%',
      display: 'flex',
    },
    button: {
      color: '#fff',
    },
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
    container: {},
    infoContainer: {
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
      },
    },
  })
)

const Detail: React.FC = () => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const gid = router.query.gid as string
  const token = router.query.token as string
  const filecount = router.query.filecount as string
  const [store, setStore] = useState({
    open: false,
    index: -1,
  })

  const { data } = useGallery({
    url: `/${gid}/${token}`,
    filecount,
  })
  const [page, setPage] = useState(1)
  const classes = useStyles()
  const selectionRef = useSelection<HTMLHeadingElement>()
  const selectionRef2 = useSelection<HTMLHeadingElement>()
  const handleOpen = (k: number) => {
    setStore({ open: true, index: k })
  }

  const download = () => {
    // if (data && data.list.length > 0) {
    //   Page.DownloadAllImg(
    //     { record: data.info, tagList: data.tagList },
    //     data.list
    //   )
    // }
  }

  const [position] = useScroll(() => window.document)
  useThrottleFn(
    () => {
      if (document.scrollingElement) {
        if (
          position.top + document.scrollingElement.clientHeight >
          document.scrollingElement.scrollHeight - 300
        ) {
          setPage((t) => t + 1)
        }
      }
    },
    [position],
    300
  )
  return (
    <Layout title={data?.info.title}>
      <Container style={{ maxWidth: 1600 }}>
        <Card className={classes.root}>
          <Hidden smDown>
            {data?.info.thumb ? (
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
              {data?.info.title_jpn}
            </Typography>
            <Typography
              variant="subtitle2"
              component="h5"
              gutterBottom
              align="center"
              ref={selectionRef2}
            >
              {data?.info.title}
            </Typography>
            <Divider variant="fullWidth" className={classes.divider} />
            <Box display="flex" className={classes.infoContainer}>
              <InfoCard record={data?.info} />
              <div className={classes.border}>
                <table>
                  <tbody>
                    {data?.tagList.map((o) => (
                      <tr key={o.name}>
                        <td
                          align="right"
                          valign="top"
                          style={{ lineHeight: '24px' }}
                        >
                          {o.name}
                        </td>
                        <td>
                          {o.tags.map((v) => (
                            <Chip
                              key={v.name}
                              label={v.name}
                              size="small"
                              variant="outlined"
                              style={{
                                borderStyle: v.dash ? 'dashed' : 'solid',
                                margin: 2,
                              }}
                              clickable
                              onClick={() => {
                                router.push(
                                  `/index?page=0&f_search=${v.keyword}`
                                )
                              }}
                            />
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
        <CommentList commentList={data?.commentList || []} />
        <Divider variant="fullWidth" className={classes.divider} />

        <Grid container className={classes.container} spacing={2} ref={ref}>
          {data?.list.slice(0, 20 * page).map((o, k) => (
            <Grid item key={o.url + k}>
              <Card>
                <CardActionArea onClick={() => handleOpen(k)}>
                  <LoadMedia className={classes.cover} src={o.thumb} />
                </CardActionArea>
              </Card>
            </Grid>
          ))}
          {(!data || data.list.length === 0) &&
            new Array(20).fill(0).map((_, k) => (
              <Grid item key={k}>
                <Card>
                  <Skeleton
                    variant="rect"
                    animation="wave"
                    className={classes.cover}
                  />
                </Card>
              </Grid>
            ))}
        </Grid>
        <ImgRead
          dataSource={data?.list || []}
          open={store.open}
          defaultValue={store.index}
          onClose={() => setStore({ open: false, index: -1 })}
        />
      </Container>
    </Layout>
  )
}

export default Detail
