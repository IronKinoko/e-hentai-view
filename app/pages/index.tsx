import React from 'react'
// import Link from 'next/link'
import Layout from '../components/Layout'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { Typography, Grid, Container, Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import SearchBar from '@/index/SearchBar'
import message from 'components/message'
import GalleryList from '@/index/GalleryList'
const useStyles = makeStyles((theme) =>
  createStyles({
    search: { margin: theme.spacing(2, 'auto') },
  })
)
const IndexPage = () => {
  const classes = useStyles()
  const router = useRouter()
  const f_search = decodeURIComponent((router.query.f_search as string) || '')

  return (
    <Layout showAvatar showSearch>
      <GalleryList key={f_search} f_search={f_search} />
    </Layout>
  )
}

export default IndexPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (!req.headers.cookie?.includes('ipb_member_id')) {
    res.statusCode = 302
    res.setHeader('Location', '/signin')
    res.end()
  }
  return { props: {} }
}
