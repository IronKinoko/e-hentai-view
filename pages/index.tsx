import React, { useEffect, useState, useCallback, useMemo } from 'react'
// import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import {
  Card,
  Typography,
  Grid,
  Box,
  Container,
  Button,
} from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { Pagination } from '@material-ui/lab'
import { Skeleton, Rating } from '@material-ui/lab'
import GalleryCard, { LoadingCard } from 'src/index/GalleryCard'
import SearchBar from '@/index/SearchBar'
import message from 'components/message'
import useGalleries from 'hooks/useGalleries'
import { useInViewport } from '@umijs/hooks'
import useSWR, { useSWRPages, cache } from 'swr'
import { axios } from 'apis'
import { GalleriesPage } from 'interface/gallery'
const useStyles = makeStyles((theme) =>
  createStyles({
    searchButton: { marginLeft: theme.spacing(1) },
    title: { fontSize: '10pt', height: 36, overflow: 'hidden' },
    card: { width: 250, margin: theme.spacing(0, 'auto') },
    btn: { margin: theme.spacing(1, 0) },
  })
)
const IndexPage: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const page = parseInt(router.query.page! as string) || 0
  const f_search = decodeURIComponent((router.query.f_search as string) || '')
  const [search, setSearch] = useState(f_search)
  const [pageTotal, setPageTotal] = useState(1)
  const [inview, inviewRef] = useInViewport()
  const handleSubmit = () => {
    if (search.length < 3 && search.length > 0)
      return message.error(
        'The search string is too short, and was ignored.',
        1500
      )
    router.push(`/index?page=0&f_search=${search}`)
  }
  useEffect(() => {
    setSearch(f_search)
  }, [f_search])

  const {
    pages,
    isLoadingMore,
    isReachingEnd,
    loadMore,
    isEmpty,
  } = useSWRPages<number | null, GalleriesPage>(
    'gallery' + f_search,
    ({ offset, withSWR }) => {
      const url = `/api/gallery?page=${offset || 0}&f_search=${f_search}`
      const { data } = withSWR(
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useSWR<GalleriesPage>(url, async (url) => {
          const res = await axios.get<GalleriesPage>(url)
          return res.data
        })
      )

      if (!data)
        return new Array(25).fill(0).map((_, k) => <LoadingCard key={k} />)
      if (data && data.error) {
        message.error(data.message!)
        router.replace('/signin')
        return []
      }
      if (data.total === 0) return []
      return data.list!.map((o) => (
        <Grid item xs={12} sm={6} md={4} lg key={o.gid}>
          <GalleryCard record={o} />
        </Grid>
      ))
    },
    ({ data }, index) => {
      if (data?.error) return null
      if (data!.total! <= (index + 1) * 25) return null
      return index + 1
    },
    [router, f_search]
  )
  useEffect(() => {
    if (inview && !isLoadingMore && !isReachingEnd) loadMore()
  }, [inview, isLoadingMore, isReachingEnd, loadMore])

  return (
    <Layout>
      <Container style={{ maxWidth: 1600 }}>
        <Container maxWidth="sm" disableGutters>
          <Grid container alignItems="center">
            <Grid item xs>
              <SearchBar
                value={search}
                onChange={(v) => setSearch(v)}
                onSearch={handleSubmit}
              />
            </Grid>
            <Button className={classes.searchButton} onClick={handleSubmit}>
              Search
            </Button>
          </Grid>
        </Container>
        <Box mt={2}>
          {isEmpty && (
            <Typography variant="subtitle2" align="center" gutterBottom>
              no this found
            </Typography>
          )}

          <Grid
            container
            wrap="wrap"
            justify="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            {pages}
          </Grid>
          {!isEmpty && (
            <Button
              buttonRef={inviewRef}
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
          )}
        </Box>
      </Container>
    </Layout>
  )
}

export default IndexPage
