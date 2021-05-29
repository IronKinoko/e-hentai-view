import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import Layout from '../src/components/Layout'
import GalleryList from '@/components/GalleryList'

const Popular: NextPage = () => {
  const [t] = useTranslation()
  return (
    <Layout title={t('Popular')} showAvatar showSearch>
      <GalleryList mode="popular" />
    </Layout>
  )
}

export default Popular

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
