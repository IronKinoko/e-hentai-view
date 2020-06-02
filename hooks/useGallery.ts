import React from 'react'
import useRequest, { Config } from './useRequest'
import { Detailpage } from 'interface/gallery'
export default function useGallery(path: string, config?: Config<Detailpage>) {
  const res = useRequest<Detailpage>({ url: '/api/gallery' + path }, config)
  return res
}
