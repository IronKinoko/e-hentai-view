import Layout from '@/components/Layout'
import Link from '@/components/Link'
import { Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'

export default function Test() {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <Layout title="test">
      <Typography variant="h6">{t('h6')}</Typography>
      <Link href={router.pathname} locale="en">
        <button>en</button>
      </Link>
      <Link href={router.pathname} locale="zh-CN">
        <button>zh-cn</button>
      </Link>
      {t('FrontPage')}
    </Layout>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
