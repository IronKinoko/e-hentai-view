import { loadImg, loadImgRes } from '@/apis'
import useSWR, { cache } from 'swr'
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
