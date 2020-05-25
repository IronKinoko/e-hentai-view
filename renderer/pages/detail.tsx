import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { NextPage } from 'next'
import { api, Page } from 'apis'
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
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Skeleton, Rating, Pagination } from '@material-ui/lab'
import Layout from 'components/Layout'
import throttle from 'lodash/throttle'
import LoadMedia from 'components/LoadMedia'
import ImgRead from '@/detail/ImgRead'
import { useRouter } from 'next/router'
import ColorChip from 'components/ColorChip'
import CommentList from 'src/detail/CommentList'

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
      maxWidth: 240,
      minWidth: 240,
      maxHeight: 320,
      objectFit: 'contain',
    },
    divider: { margin: theme.spacing(2, 0) },
    chip: {
      margin: theme.spacing(0, 'auto', 2),
      width: '70%',
      display: 'flex',
    },
    button: {
      color: '#fff',
    },
  }),
)

export type DetailProps = { gid: string; token: string; filecount: string }
const Detail: NextPage<DetailProps> = () => {
  const router = useRouter()
  const ref = useRef<HTMLDivElement>(null)
  const gid = router.query.gid as string
  const token = router.query.token as string
  const filecount = router.query.filecount as string
  const [record, setRecord] = useState<Page.IndexListItemPorps>()
  const [dataSource, setDataSource] = useState<{
    list: Page.DetailPageListItemProps[]
    commentList: Page.commentListItemProps[]
    tagList: Page.tagListItemProps[]
  }>({ list: [], commentList: [], tagList: [] })
  const [store, setStore] = useState({
    open: false,
    index: -1,
  })

  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const classes = useStyles()
  useEffect(() => {
    api.gdata([[gid, token]]).then((res) => {
      console.log(res)
      setRecord(res.data.gmetadata[0])
    })
    Page.DetailPage(gid, token, filecount).then((res) => {
      console.log(res)
      setDataSource(res)
      setTotalPage(Math.ceil(+filecount / 20))
    })
  }, [gid, token, filecount])

  const handleOpen = (k: number) => {
    setStore({ open: true, index: k })
  }

  const download = () => {
    if (dataSource.list.length > 0) {
      Page.DownloadAllImg(
        { record: record!, tagList: dataSource.tagList },
        dataSource.list,
      )
    }
  }

  const renderPagination = useMemo(
    () => (
      <Box m={2}>
        <Grid container justify="center">
          <Pagination
            count={totalPage}
            page={page}
            siblingCount={2}
            onChange={(_, v) => setPage(v)}
          />
        </Grid>
      </Box>
    ),
    [page, totalPage],
  )

  return (
    <Layout title={record?.title}>
      <Container style={{ maxWidth: 1600 }}>
        <Box p={2}>
          <Card className={classes.root}>
            {record?.thumb ? (
              <LoadMedia className={classes.cover} src={record.thumb} />
            ) : (
              <Skeleton
                variant="rect"
                animation="wave"
                width={240}
                height={320}
              />
            )}
            <CardContent className={classes.details}>
              <Typography
                variant="h5"
                component="h5"
                gutterBottom
                align="center">
                {record?.title}
              </Typography>
              <Typography
                variant="subtitle2"
                component="h5"
                gutterBottom
                align="center">
                {record?.title_jpn}
              </Typography>
              <Divider variant="fullWidth" className={classes.divider} />
              <Box display="flex">
                <CardContent className={classes.cover}>
                  <ColorChip
                    className={classes.chip}
                    label={record?.category}
                    size="small"
                  />
                  <Typography
                    component="p"
                    variant="body2"
                    align="center"
                    gutterBottom>
                    {record?.uploader}
                  </Typography>
                  <Typography component="p" variant="body2">
                    Posted: {record?.time}
                  </Typography>
                  <Typography component="p" variant="body2">
                    File Size: {record?.filesize}
                  </Typography>
                  <Typography component="p" variant="body2">
                    Length: {record?.filecount}
                  </Typography>
                  <Grid container alignItems="center">
                    <Typography component="p" variant="body2">
                      Rating:&nbsp;
                    </Typography>
                    <Rating
                      name="rating"
                      size="small"
                      readOnly
                      max={5}
                      value={record?.rating ? +record.rating : 0}
                    />
                  </Grid>
                </CardContent>
                <Divider variant="fullWidth" orientation="vertical" />
                <CardContent style={{ flex: 1 }}>
                  <table>
                    <tbody>
                      {dataSource.tagList.map((o) => (
                        <tr key={o.name}>
                          <td align="right">{o.name}</td>
                          <td>
                            {o.tags.map((v) => (
                              <Chip
                                key={v.name}
                                label={v.name}
                                size="small"
                                variant="outlined"
                                style={{
                                  borderStyle: v.dash ? 'dashed' : 'solid',
                                }}
                                clickable
                                onClick={() => {
                                  router.push(
                                    `/index?page=0&f_search=${v.keyword}`,
                                  )
                                }}
                              />
                            ))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardContent>
                <Divider variant="fullWidth" orientation="vertical" />
                <CardContent>
                  <Button onClick={download} variant="text" color="primary">
                    download
                  </Button>
                </CardContent>
              </Box>
            </CardContent>
          </Card>
          <Divider variant="fullWidth" className={classes.divider} />
          {renderPagination}
          <Grid container justify="space-between" spacing={2} ref={ref}>
            {dataSource.list.slice((page - 1) * 20, 20 * page).map((o, k) => (
              <Grid item key={o.url + k}>
                <Card style={{ width: 240 }}>
                  <CardActionArea
                    onClick={() => handleOpen((page - 1) * 20 + k)}>
                    <LoadMedia className={classes.cover} src={o.thumb} />
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
            {dataSource.list.length === 0 &&
              new Array(20).fill(0).map((_, k) => (
                <Grid item key={k}>
                  <Card>
                    <Skeleton
                      variant="rect"
                      animation="wave"
                      width={240}
                      height={320}
                    />
                  </Card>
                </Grid>
              ))}
          </Grid>
          {renderPagination}

          <CommentList commentList={dataSource.commentList} />
        </Box>
        <ImgRead
          dataSource={dataSource.list}
          open={store.open}
          defaultValue={store.index}
          onClose={() => setStore({ open: false, index: -1 })}
        />
      </Container>
    </Layout>
  )
}

export default Detail
