import { axios } from '@/apis'
import { FavoritesInfoProps } from '@/interface/favorites'
import useSWR from 'swr'
const useFavoritesInfo = () => {
  const res = useSWR('/api/favorites/info', async (url) => {
    const res = await axios.get<{ error: boolean; list: FavoritesInfoProps[] }>(
      url
    )
    return res.data.list
  })
  return res
}

export default useFavoritesInfo
