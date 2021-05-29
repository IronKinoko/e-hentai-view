import Layout from '@/components/Layout'
import GalleryList from '@/components/GalleryList'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const Watched: NextPage = () => {
  const [t] = useTranslation()
  return (
    <Layout title={t('Watched')} showAvatar showSearch>
      <GalleryList mode="watched" />
    </Layout>
  )
}

export default Watched

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
