import React from 'react'
import Layout from 'components/Layout'
import { NextPage } from 'next'
import WatchedGalleryList from '@/watched/WatchedGalleryList'

const Watched: NextPage = () => {
  return (
    <Layout title="Watched" gutterBottom>
      <WatchedGalleryList />
    </Layout>
  )
}

export default Watched
Watched.getInitialProps = async () => ({})
