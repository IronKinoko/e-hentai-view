import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import ComicList from '@/comic/ComicList'
import { useRouter } from 'next/router'
import ComicHorizontalList from '@/comic/ComicHorizontalList'
import { useComicConfigState } from '@/comic/ComicConfig'
import useComicData from 'hooks/useComicData'
import Loading from 'components/Loading'
import Layout from 'components/Layout'
import { useTranslation } from 'i18n'
const Read: NextPage = () => {
  const router = useRouter()
  const gid = router.query.gid as string
  const token = router.query.token as string
  const [config, setConfig] = useComicConfigState()
  const [t] = useTranslation()

  const [current, setCurrent] = useState(-2)
  useEffect(() => {
    setCurrent(
      (router.query.current as string) === undefined
        ? -1
        : parseInt(router.query.current as string)
    )
  }, [router.query, config.direction])

  const { data } = useComicData(`/${gid}/${token}`)

  if (current === -2) return null

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
Read.getInitialProps = () => ({})

export default Read
