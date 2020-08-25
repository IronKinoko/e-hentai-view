import React from 'react'
import useSWR from 'swr'
import { axios } from 'apis'
import { Torrent } from 'interface/gallery'

const useTorrent = (path: string) => {
  const res = useSWR(`/api/gallery/${path}/torrent`, async (url) => {
    const res = await axios.get<{
      error: boolean
      list: Torrent[]
    }>(url)
    if (res.data.error) throw new Error('get torrent error')
    return res.data.list
  })
  return res
}

export default useTorrent
