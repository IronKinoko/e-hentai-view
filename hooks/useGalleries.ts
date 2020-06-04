import useRequest, { Config } from './useRequest'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import message from 'components/message'
import { cache } from 'swr'
import { GalleriesPage } from 'interface/gallery'

export default function useGalleries(
  {
    page,
    f_search,
  }: {
    [k: string]: string | number
  },
  config?: Config<GalleriesPage>
) {
  const res = useRequest<GalleriesPage>(
    {
      url: '/api/gallery',
      params: { page, f_search },
    },
    config
  )

  const router = useRouter()
  useEffect(() => {
    if (res.data && res.data.error) {
      message.error(res.data.message!)
      router.replace('/signin')
      cache.clear()
    }
  }, [router, res, page, f_search])
  return res
}
