import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../src/components/Layout'
import GalleryList from '@/components/GalleryList'

const IndexPage = () => {
  const router = useRouter()
  const f_search = decodeURIComponent((router.query.f_search as string) || '')

  return (
    <Layout showAvatar showSearch>
      <GalleryList key={f_search} mode="index" f_search={f_search} />
    </Layout>
  )
}

export default IndexPage

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
