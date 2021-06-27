import { axios } from '@/apis'
import { Detailpage } from '@/interface/gallery'
import useSWR from 'swr'
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

  return res
}
