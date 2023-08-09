import { axios } from '@/apis'
import { GalleriesPage } from '@/interface/gallery'
import { useEffect } from 'react'
import { useSWRInfinite } from 'swr'
import useInViewportWithDistance from './useInViewportWithDistance'

export interface UseGalleryListOptions {
  f_search?: string
  mode: 'index' | 'popular' | 'favorites' | 'watched'
  favcat?: string
}
export default function useGalleryList<T extends HTMLElement = HTMLDivElement>(
  options: UseGalleryListOptions
) {
  const { mode, f_search, favcat } = options
  const [inview, inviewRef] = useInViewportWithDistance<T>(600)
  const { data, error, size, setSize } = useSWRInfinite<GalleriesPage['list']>(
    (_offset, previousPageData) => {
      let next = null
      let favorited = null
      if (previousPageData&&previousPageData.length > 0){
        // 获取最后一个gid
        next = previousPageData[previousPageData.length - 1].gid
        favorited = previousPageData[previousPageData.length - 1].favorited / 1000
      }
      switch (mode) {
        case 'index':
          return `/api/gallery?${next !== null ? `next=${next}&` : ''}f_search=${f_search}`;
        case 'popular':
          return '/api/popular';
        case 'favorites':
          return `/api/favorites?${next !== null ? `next=${next}-${favorited}&` : ''}favcat=${favcat}`;
        case 'watched':
          return `/api/watched?${next !== null ? `next=${next}&` : ''}`;
      }
    },
    async (url: string) => {
      const res = await axios.get<GalleriesPage>(url)
      if (res.data.error) throw res.data.message
      return res.data.list
    }
  )

  const dataSource = data ? data.flat(1) : []
  const isLoadingInitialData = !data && !error
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = !isLoadingInitialData && dataSource.length === 0
  const isReachingEnd =
    isEmpty ||
    mode === 'popular' ||
    (data && data[data.length - 1].length < (mode === 'favorites' ? 50 : 25))
  // const isRefreshing = isValidating && data && data.length === size

  useEffect(() => {
    if (inview && !isLoadingMore && !isReachingEnd) setSize((size) => size + 1)
  }, [inview, isLoadingMore, isReachingEnd, setSize, mode])

  return {
    dataSource,
    isEmpty,
    isReachingEnd,
    isLoadingInitialData,
    isLoadingMore,
    inviewRef,
    error,
  }
}
