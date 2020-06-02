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
const useStyles = makeStyles((theme) =>
  createStyles({
    searchButton: { marginLeft: theme.spacing(1) },
    title: { fontSize: '10pt', height: 36, overflow: 'hidden' },
    card: { width: 250, margin: theme.spacing(0, 'auto') },
  })
)
const IndexPage: NextPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const page = parseInt(router.query.page! as string) || 0
  const f_search = decodeURIComponent((router.query.f_search as string) || '')
  const [search, setSearch] = useState(f_search)
  const [pageTotal, setPageTotal] = useState(1)
  const { data } = useGalleries({ page, f_search })
  const handleSubmit = () => {
    if (search.length < 3 && search.length > 0)
      return message.error(
        'The search string is too short, and was ignored.',
        1500
      )
    router.push(`/index?page=0&f_search=${search}`)
  }

  useEffect(() => {
    if (data && data.total) {
      setPageTotal(Math.ceil(data.total / 25))
    }
  }, [data])
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    router.push(`/index?page=${value - 1}&f_search=${search}`)
  }
  const renderPagination = (
    <Box m={2}>
      <Grid container justify="center">
        <Pagination
          size="small"
          count={pageTotal}
          page={page + 1}
          onChange={handlePageChange}
        />
      </Grid>
    </Box>
  )

  return (
    <Layout title="home">
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
          {data && data.list?.length === 0 ? (
            <Typography variant="subtitle2" align="center">
              no this found
            </Typography>
          ) : (
            <>
              <Typography variant="subtitle2" align="center">
                Showing {data?.total || 0} results
              </Typography>
              {renderPagination}
              <Grid
                container
                wrap="wrap"
                justify="flex-start"
                alignItems="stretch"
                spacing={2}
              >
                {!data || !data.list
                  ? new Array(25).fill(0).map((_, k) => <LoadingCard key={k} />)
                  : data.list?.map((o) => (
                      <Grid item xs={12} sm={6} md={4} lg key={o.gid}>
                        <GalleryCard record={o} />
                      </Grid>
                    ))}
              </Grid>
              {renderPagination}
            </>
          )}
        </Box>
      </Container>
    </Layout>
  )
}

export default IndexPage
