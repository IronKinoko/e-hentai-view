import { EVENT_LOAD_MORE_PAGE } from '@/constant'
import {
  ComicListDataSourceProps,
  getPageWithRetry,
  mergeData,
} from '@/widgets/comic/utils'
import { useEffect, useState } from 'react'
import { cache, mutate } from 'swr'
import useComicReadPageHistory from './useComicReadPageHistory'
import useEventManager from './useEventListenerEnhance'
import useSharedState from './useSharedState'

function noop() {}
interface UseCommicDataOptions {
  onlyInitData: boolean
}
const defaultOpts: UseCommicDataOptions = {
  onlyInitData: false,
}
export default function useComicData(
  comicUrl: string,
  opts?: UseCommicDataOptions
) {
  const { onlyInitData } = opts || defaultOpts
  const comicPagesKey = `${comicUrl}/read`
  const [, setComicReadPageHistory] = useComicReadPageHistory()
  const [loadedPageKeys, setLoadedPageKeys] = useState<boolean[]>([true])
  const loadMorePage$ = useEventManager(EVENT_LOAD_MORE_PAGE)
  const res = useSharedState<ComicListDataSourceProps>(comicPagesKey, {
    current: 0,
    list: [],
    total: 0,
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
          ...data,
          total: res.total,
          list: res.list,
        }),
        false
      )
    }
    if ((!data || data.list.length === 0) && onlyInitData) {
      fn()
    }
  }, [comicPagesKey, comicUrl, data, onlyInitData])

  useEffect(() => {
    if (onlyInitData) return noop
    return loadMorePage$.subscribe(async (pageIndex: number) => {
      if (loadedPageKeys[pageIndex]) return
      setLoadedPageKeys((t) => {
        t[pageIndex] = true
        return t
      })

      let res = await getPageWithRetry(`/api/gallery${comicUrl}/${pageIndex}`)
      res.list.forEach((o) => (o!.aspectratio = 210 / 297))

      mutate(
        comicPagesKey,
        (data: ComicListDataSourceProps) => ({
          ...data,
          total: res.total,
          list: mergeData(data?.list || [], res.list, pageIndex, res.total),
        }),
        false
      )
    })
  }, [comicPagesKey, comicUrl, loadedPageKeys, loadMorePage$, onlyInitData])

  useEffect(() => {
    if (onlyInitData) return noop
    if (typeof data?.current === 'number') {
      setComicReadPageHistory((t) => {
        if (data.current === 0) delete t[comicPagesKey]
        else t[comicPagesKey] = data.current
        return { ...t }
      })
    }
  }, [comicPagesKey, data, setComicReadPageHistory, onlyInitData])

  return res
}
