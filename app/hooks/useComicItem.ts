import React from 'react'
import useSWR, { cache } from 'swr'
import { loadImg, loadImgRes } from 'apis'
function useComicItemImage(url: string | null) {
  const res = useSWR(
    url,
    async (url) => {
      let res = cache.get(url) as loadImgRes
      if (!res) res = await loadImg(url)
      if (res.error || res.url === '') throw new Error('load faild')
      return res
    },
    { revalidateOnFocus: false }
  )

  return res
}
export default useComicItemImage
