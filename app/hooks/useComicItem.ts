import React from 'react'
import useSWR from 'swr'
import { loadImg } from 'apis'
function useComicItemImage(url: string | null) {
  const res = useSWR(
    url,
    async (url) => {
      let res = await loadImg(url)
      if (res.error || res.url === '') throw new Error('load faild')
      return res
    },
    { revalidateOnFocus: false }
  )

  return res
}
export default useComicItemImage
