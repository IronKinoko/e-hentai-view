import React, { useEffect, useState } from 'react'
import { setting } from 'apis'
import { NextPage } from 'next'
import Layout from 'components/Layout'
import Loading from 'components/Loading'

const EHTag: NextPage = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setting()
    return () => {
      setting()
    }
  }, [])
  return (
    <Layout title="EHentai Tags" noContainer fullScreen>
      <iframe
        src="https://exhentai.org/mytags"
        frameBorder="0"
        width="100%"
        height="100%"
        onLoad={() => {
          setLoading(false)
        }}
      />
      {loading && <Loading />}
    </Layout>
  )
}

export default EHTag
