import React, { useEffect } from 'react'
import { NextPage } from 'next'
import ComicList from '@/comic/ComicList'
import { useRouter } from 'next/router'
const Read: NextPage = () => {
  const router = useRouter()
  const gid = router.query.gid as string
  const token = router.query.token as string
  const current =
    (router.query.current as string) === undefined
      ? -1
      : parseInt(router.query.current as string)
  return <ComicList comicUrl={`/${gid}/${token}`} defaultCurrent={current} />
}
Read.getInitialProps = () => ({})

export default Read
