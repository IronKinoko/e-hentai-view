import React from 'react'
import Layout from 'components/Layout'
import { NextPage } from 'next'
import WatchedGalleryList from '@/watched/WatchedGalleryList'
import { useTranslation } from 'i18n'

const Watched: NextPage = () => {
  const [t] = useTranslation()
  return (
    <Layout title={t('Watched')} gutterBottom showAvatar showSearch>
      <WatchedGalleryList />
    </Layout>
  )
}

export default Watched
Watched.getInitialProps = async () => ({})
