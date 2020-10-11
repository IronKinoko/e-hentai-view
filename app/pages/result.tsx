import React from 'react'
import Layout from 'components/Layout'
import GalleryList from '@/index/GalleryList'
import { useRouter } from 'next/router'
import { Router } from 'i18n'
import { IconButton } from '@material-ui/core'
import TuneIcon from '@material-ui/icons/Tune'
import CloseIcon from '@material-ui/icons/Close'

const Result = () => {
  const router = useRouter()

  const f_search = decodeURIComponent(router.query.f_search as string)

  return (
    <Layout
      title={f_search}
      showBack
      tool={
        <>
          <IconButton onClick={() => Router.push('/search')}>
            <CloseIcon />
          </IconButton>
          <IconButton edge="end">
            <TuneIcon />
          </IconButton>
        </>
      }
    >
      <GalleryList key={f_search} f_search={f_search} />
    </Layout>
  )
}

export default Result
