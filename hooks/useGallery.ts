import React from 'react'
import useRequest, { Config } from './useRequest'
import { Detailpage } from 'interface/gallery'

export default function useGallery(
  { url, filecount }: { [k: string]: string },
  config?: Config<Detailpage>
) {
  const res = useRequest<Detailpage>(
    { url: '/api/gallery' + url, params: { filecount } },
    config
  )
  return res
}
