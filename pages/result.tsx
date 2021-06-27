import Layout from '@/components/Layout'
import GalleryList from '@/components/GalleryList'
import { IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'

const Result = () => {
  const router = useRouter()

  const f_search = decodeURIComponent(router.query.f_search as string)

  return (
    <Layout
      title={f_search}
      showBack
      tool={
        <>
          <IconButton onClick={() => router.push('/search')}>
            <CloseIcon />
          </IconButton>
          {/* <IconButton edge="end">
            <TuneIcon />
          </IconButton> */}
        </>
      }
    >
      <GalleryList key={f_search} mode="index" f_search={f_search} />
    </Layout>
  )
}

export default Result

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
