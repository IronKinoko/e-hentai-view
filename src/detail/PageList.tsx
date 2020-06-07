import React, { useState, useEffect, useMemo } from 'react'
import { useInViewport } from '@umijs/hooks'
import {
  Button,
  Grid,
  Typography,
  Card,
  CardActionArea,
} from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import useSWR, { useSWRPages } from 'swr'
import { PageListProps, DetailPageListItemProps } from 'interface/gallery'
import { axios } from 'apis'
import LoadMedia from 'components/LoadMedia'
import { Skeleton, SpeedDial } from '@material-ui/lab'
import ImgRead from './ImgRead'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import { flatten } from 'lodash'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cover: {
      margin: theme.spacing(0, 'auto'),
      maxHeight: 320,
      minHeight: 150,
    },

    container: {
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(4, 1fr)',
      },
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    },

    speedDial: {
      position: 'fixed',
      right: 16,
      bottom: 88,
      zIndex: theme.zIndex.speedDial - 2,
    },
    btn: { margin: theme.spacing(1, 0) },
  })
)
const PageList: React.FC<PageListProps> = ({ url, initialData, filecount }) => {
  const [inView, ref] = useInViewport()
  const classes = useStyles()
  const [store, setStore] = useState({
    open: false,
    index: 0,
  })

  const handleOpen = (k: number) => {
    setStore({ open: true, index: k })
  }

  const {
    pages,
    isEmpty,
    isLoadingMore,
    isReachingEnd,
    pageSWRs,
    loadMore,
  } = useSWRPages<number | null, DetailPageListItemProps[]>(
    url,
    ({ offset, withSWR }) => {
      const page = offset || 0
      const { data } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR(`/api/gallery${url}/${page}`, async (url) => {
          if (page === 0) return initialData
          const res = await axios.get<{
            error: boolean
            list: DetailPageListItemProps[]
          }>(url)

          return res.data.list
        })
      )

      if (!data)
        return new Array(20).fill(0).map((_, k) => (
          <Grid item key={k}>
            <Card>
              <Skeleton
                variant="rect"
                animation="wave"
                className={classes.cover}
                height={150}
              />
            </Card>
          </Grid>
        ))

      return data.map((o, k) => (
        <Grid item key={o.url + k} container wrap="nowrap" direction="column">
          <Grid item xs>
            <Card>
              <CardActionArea onClick={() => handleOpen(k + page * 20)}>
                <LoadMedia className={classes.cover} src={o.thumb} />
              </CardActionArea>
            </Card>
          </Grid>
          <Typography align="center">{k + 1 + page * 20}</Typography>
        </Grid>
      ))
    },
    ({ data }, index) => {
      if (filecount <= (index + 1) * 20) return null
      return index + 1
    },
    []
  )
  useEffect(() => {
    if (inView && !isLoadingMore && !isReachingEnd) loadMore()
  }, [inView, isLoadingMore, isReachingEnd, loadMore])
  const dataSource = useMemo(() => flatten(pageSWRs.map((o) => o.data || [])), [
    pageSWRs,
  ])
  return (
    <>
      <Grid container className={classes.container} spacing={2}>
        {pages}
      </Grid>
      <Button
        buttonRef={ref}
        fullWidth
        disabled={isLoadingMore || isReachingEnd}
        className={classes.btn}
      >
        {isReachingEnd
          ? 'Reach End'
          : isLoadingMore
          ? 'Loading...'
          : 'Load More'}
      </Button>
      <ImgRead
        dataSource={dataSource || []}
        total={filecount}
        open={store.open}
        loadMore={loadMore}
        defaultValue={store.index}
        onClose={(index) => setStore({ open: false, index })}
      />
      <SpeedDial
        ariaLabel="continue"
        open
        className={classes.speedDial}
        onClick={() => setStore((t) => ({ ...t, open: true }))}
        icon={<PlayArrowIcon />}
      />
    </>
  )
}

export default PageList
