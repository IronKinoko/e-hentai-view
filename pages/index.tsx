import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Typography, Grid, Container, Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import SearchBar from '@/index/SearchBar'
import message from 'components/message'
import GalleryList from '@/index/GalleryList'
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

  return (
    <Layout>
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
      <GalleryList key={f_search} f_search={f_search} />
    </Layout>
  )
}

export default IndexPage
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return { props: {} }
}
