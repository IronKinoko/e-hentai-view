import Layout from '@/components/Layout'
import Language from '@/widgets/setting/Language'
import TagShow from '@/widgets/setting/TagShow'
import ThemeMode from '@/widgets/setting/ThemeMode'
import { useIsmobile } from '@/theme'
import { List } from '@material-ui/core'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'
import { useRouter } from 'next/router'
const Advanced: NextPage = () => {
  const [t] = useTranslation()
  const matches = useIsmobile()
  const router = useRouter()
  return (
    <Layout
      title={t('Advanced')}
      showBack={{ pathname: '/settings', query: router.query }}
      noContainer={Boolean(matches)}
    >
      <List>
        <Language />
        <ThemeMode />
        <TagShow />
      </List>
    </Layout>
  )
}

export default Advanced

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
