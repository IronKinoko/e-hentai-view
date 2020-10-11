import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import GalleryList from '@/index/GalleryList'
import { Router } from 'i18n'
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

const Index = () => {
  if (typeof window !== 'undefined') {
    if (!document.cookie.includes('ipb_member_id')) {
      Router.push('/signin')
      return null
    }
  }
  return <IndexPage />
}

export default Index
