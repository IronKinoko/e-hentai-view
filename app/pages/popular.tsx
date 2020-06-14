import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
import Layout from '../components/Layout'
import { NextPage } from 'next'
import PopularGalleryList from '@/popular/PopularGalleryList'

const Popular: NextPage = () => {
  return (
    <Layout title="Popular">
      <PopularGalleryList />
    </Layout>
  )
}

export default Popular

Popular.getInitialProps = async () => ({})
