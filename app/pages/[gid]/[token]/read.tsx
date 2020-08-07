import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import ComicList from '@/comic/ComicList'
import { useRouter } from 'next/router'
import ComicHorizontalList from '@/comic/ComicHorizontalList'
import { useComicConfigState } from '@/comic/ComicConfig'
const Read: NextPage = () => {
  const router = useRouter()
  const gid = router.query.gid as string
  const token = router.query.token as string
  const [config, setConfig] = useComicConfigState()

  const [current, setCurrent] = useState(-2)
  useEffect(() => {
    setCurrent(
      (router.query.current as string) === undefined
        ? -1
        : parseInt(router.query.current as string)
    )
  }, [router.query, config.direction])

  if (current === -2) return null

  if (config.direction === 'vertical') {
    return <ComicList comicUrl={`/${gid}/${token}`} defaultCurrent={current} />
  } else {
    return (
      <ComicHorizontalList
        comicUrl={`/${gid}/${token}`}
        defaultCurrent={current}
      />
    )
  }
}
Read.getInitialProps = () => ({})

export default Read
