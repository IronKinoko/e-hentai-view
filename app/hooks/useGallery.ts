import React from 'react'
import { Detailpage } from 'interface/gallery'
import useSWR from 'swr'
import { axios } from 'apis'
import cloneDeep from 'lodash/cloneDeep'
export default function useGallery({ url }: { [k: string]: string }) {
  const res = useSWR(
    '/api/gallery' + url,
    async (url) => {
      const res = await axios.get<Detailpage>(url)
      if (res.data.error) throw new Error('error')
      return res.data
    },
    { errorRetryInterval: 100 }
  )

  // const torrents = useSWR(
  //   () =>
  //     //@ts-ignore
  //     parseInt(res.data?.info.torrentcount) > 0
  //       ? '/api/gallery' + url + '/torrent'
  //       : null,
  //   async (url) => {
  //     const torrents = await axios.get<{
  //       error: boolean
  //       list: Detailpage['info']['torrents']
  //     }>(url)

  //     if (torrents.data.error) throw new Error('error')
  //     return torrents.data
  //   },
  //   { errorRetryInterval: 100 }
  // )
  // if (res.data && torrents.data) {
  //   res.mutate((currentDate) => {
  //     let data = cloneDeep(currentDate)
  //     data.info.torrents = torrents.data?.list
  //     return data
  //   })
  // }

  return res
}
