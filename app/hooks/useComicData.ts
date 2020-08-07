import useSWR, { cache, mutate } from 'swr'
import {
  ComicListDataSourceProps,
  getPageWithRetry,
  mergeData,
} from '@/comic/utils'
import { useEffect, useState } from 'react'
import { EVENT_LOAD_MORE_PAGE } from 'constant'

export default function useComicData(comicUrl: string) {
  const comicPagesKey = `${comicUrl}/read`
  const [loadedPageKeys, setLoadedPageKeys] = useState<boolean[]>([true])
  const res = useSWR<ComicListDataSourceProps>(comicPagesKey, {
    initialData: cache.get(comicPagesKey) || {
      current: 0,
      list: [],
      total: 0,
    },
  })
  const { data } = res

  useEffect(() => {
    const fn = async () => {
      let res = await getPageWithRetry(`/api/gallery${comicUrl}/0`)
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

  return res
}
