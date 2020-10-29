import useSWR, { cache, mutate } from 'swr'
import {
  ComicListDataSourceProps,
  getPageWithRetry,
  mergeData,
} from '@/comic/utils'
import { useEffect, useState } from 'react'
import { EVENT_LOAD_MORE_PAGE, LOCAL_COMIC_READ_PAGE_HISTORY } from 'constant'
import useEnhanceLocalStorageState from './useEnhanceLocalStorageState'
import useComicReadPageHistory from './useComicReadPageHistory'

export default function useComicData(comicUrl: string) {
  const comicPagesKey = `${comicUrl}/read`
  const [
    comicReadPageHistory,
    setComicReadPageHistory,
  ] = useComicReadPageHistory()
  const [loadedPageKeys, setLoadedPageKeys] = useState<boolean[]>([true])
  const res = useSWR<ComicListDataSourceProps>(comicPagesKey, {
    initialData: cache.get(comicPagesKey) || {
      current: 0,
      list: [],
      total: 0,
    },
  })
  const { data } = res
  if (!cache.has(comicPagesKey)) cache.set(comicPagesKey, data)
  useEffect(() => {
    const fn = async () => {
      let res = await getPageWithRetry(`/api/gallery${comicUrl}/0`)
      res.list.forEach((o) => (o!.aspectratio = 210 / 297))
      mutate(
        comicPagesKey,
        (data: ComicListDataSourceProps) => ({
          ...(data ? data : { current: 0, list: [], total: 0 }),
          total: res.total,
          list: mergeData(data?.list || [], res.list, 0, res.total),
        }),
        false
      )
    }
    fn()
  }, [comicPagesKey, comicUrl])

  useEffect(() => {
    const fn = ((async (e: CustomEvent<number>) => {
      if (loadedPageKeys[e.detail]) return
      setLoadedPageKeys((t) => ((t[e.detail] = true), t))

      let res = await getPageWithRetry(`/api/gallery${comicUrl}/${e.detail}`)
      res.list.forEach((o) => (o!.aspectratio = 210 / 297))

      mutate(
        comicPagesKey,
        (data: ComicListDataSourceProps) => ({
          ...(data ? data : { current: 0, list: [], total: 0 }),
          total: res.total,
          list: mergeData(data?.list || [], res.list, e.detail, res.total),
        }),

        false
      )
    }) as unknown) as EventListener
    document.addEventListener(EVENT_LOAD_MORE_PAGE, fn)

    return () => {
      document.removeEventListener(EVENT_LOAD_MORE_PAGE, fn)
    }
  }, [comicPagesKey, comicUrl, data, loadedPageKeys])

  useEffect(() => {
    if (data?.current) {
      setComicReadPageHistory((t) => {
        t[comicPagesKey] = data.current
        return t
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicPagesKey, data])

  return res
}
