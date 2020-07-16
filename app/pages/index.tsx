import React, { useEffect } from 'react'
// import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Typography, Grid, Container, Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import SearchBar from '@/index/SearchBar'
import message from 'components/message'
import GalleryList from '@/index/GalleryList'
import Router from 'next/router'
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

export default () => {
  if (typeof window !== 'undefined') {
    if (!document.cookie.includes('ipb_member_id')) {
      Router.push('/signin')
      return null
    }
  }
  return <IndexPage />
}
