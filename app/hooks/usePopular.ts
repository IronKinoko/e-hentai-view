import React from 'react'
import useSWR from 'swr'
import { axios } from 'apis'
import { IndexListItemPorps } from 'interface/gallery'
const usePopular = () => {
  const res = useSWR('/api/popular', async (url) => {
    const res = await axios.get<{ error: boolean; list: IndexListItemPorps[] }>(
      url
    )
    return res.data.list
  })
  return res
}

export default usePopular
