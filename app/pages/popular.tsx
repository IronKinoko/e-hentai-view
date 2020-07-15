import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import PopularGalleryList from '@/popular/PopularGalleryList'
import { useTranslation } from 'i18n'

const Popular: NextPage = () => {
  const [t] = useTranslation()
  return (
    <Layout title={t('Popular')} showAvatar showSearch>
      <PopularGalleryList />
    </Layout>
  )
}

export default Popular

Popular.getInitialProps = async () => ({})
