import Layout from '@/components/Layout'
import Loading from '@/components/Loading'
import useComicData from '@/hooks/useComicData'
import { useComicConfigState } from '@/widgets/comic/ComicConfig'
import ComicHorizontalList from '@/widgets/comic/ComicHorizontalList'
import ComicList from '@/widgets/comic/ComicList'
import { NextPage } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import React from 'react'
const Read: NextPage = () => {
  const router = useRouter()
  const gid = router.query.gid as string
  const token = router.query.token as string
  const current = router.query.current
    ? parseInt(router.query.current as string)
    : -1
  const [config] = useComicConfigState()
  const [t] = useTranslation()

  const { data } = useComicData(`/${gid}/${token}`, { onlyInitData: true })

  if (!data || data.total === 0) {
    return (
      <Layout title={t('Loading') + '...'} fullScreen showBack>
        <Loading />
      </Layout>
    )
  }

  return (
    <>
      <style jsx global>{`
        * {
          user-select: none;
        }
      `}</style>
      {config.direction === 'vertical' ? (
        <ComicList comicUrl={`/${gid}/${token}`} defaultCurrent={current} />
      ) : (
        <ComicHorizontalList
          comicUrl={`/${gid}/${token}`}
          defaultCurrent={current}
        />
      )}
    </>
  )
}

export default Read
export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  }
}
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
