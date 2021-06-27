import { setting } from '@/apis'
import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect, useState } from 'react'

const EHTag: NextPage = () => {
  const [loading, setLoading] = useState(true)
  const [t] = useTranslation()
  useEffect(() => {
    setting()
    return () => {
      setting()
    }
  }, [])
  return (
    <Layout title={t('EH.EhentaiTags')} showBack noContainer fullScreen>
      <iframe
        title="exhentai-tags"
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
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
