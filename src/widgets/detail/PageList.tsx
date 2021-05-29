import { loadMorePage } from '@/apis'
import LoadMedia from '@/components/LoadMedia'
import useInViewportWithDistance from '@/hooks/useInViewportWithDistance'
import { PageListProps } from '@/interface/gallery'
import {
  Button,
  Card,
  CardActionArea,
  Grid,
  Typography,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Skeleton } from '@material-ui/lab'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSWRInfinite } from 'swr'
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
      bottom: 16,
      zIndex: theme.zIndex.speedDial - 2,
    },
    btn: { margin: theme.spacing(1, 0) },
  })
)
const PageList: React.FC<Omit<PageListProps, 'filecount'>> = ({
  url,
  initialData,
}) => {
  const [inView, ref] = useInViewportWithDistance(600)
  const [t] = useTranslation()
  const classes = useStyles()
  const router = useRouter()
  const handleOpen = (k?: number) => {
    if (k)
      router.push(
        '/[gid]/[token]/read?current=' + k,
        url + '/read?current=' + k
      )
    else router.push('/[gid]/[token]/read', url + '/read')
  }

  const { data, error, size, setSize } = useSWRInfinite(
    (offset) => `/api/gallery${url}/${offset}`,
    async (url: string) => {
      if (url.endsWith('0')) return initialData
      return await loadMorePage(url)
    }
  )

  const dataSource = data ? data.flat(1) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = !isLoadingInitialData && dataSource.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1].length < 20)

  useEffect(() => {
    if (inView && !isLoadingMore && !isReachingEnd) setSize((t) => t + 1)
  }, [inView, isLoadingMore, isReachingEnd, setSize])

  return (
    <>
      <Grid container className={classes.container} spacing={2}>
        {dataSource.map((o, i) => (
          <Grid item key={o.url} container wrap="nowrap" direction="column">
            <Grid item xs>
              <Card>
                <CardActionArea onClick={() => handleOpen(i)}>
                  <LoadMedia className={classes.cover} src={o.thumb} />
                </CardActionArea>
              </Card>
            </Grid>
            <Typography align="center">{i + 1}</Typography>
          </Grid>
        ))}
        {isLoadingMore &&
          new Array(20).fill(0).map((_, k) => (
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
          ))}
      </Grid>
      <Button
        buttonRef={ref}
        fullWidth
        disabled={isLoadingMore || isReachingEnd}
        className={classes.btn}
      >
        {isReachingEnd
          ? t('ReachEnd')
          : isLoadingMore
          ? t('Loading') + '...'
          : t('More')}
      </Button>
    </>
  )
}

export default PageList
