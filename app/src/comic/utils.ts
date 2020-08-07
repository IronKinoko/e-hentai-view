import { DetailPageListItemProps } from 'interface/gallery'
import { axios } from 'apis'

export const pageSize = 20

export interface ComicListDataSourceProps {
  total: number
  list: (DetailPageListItemProps | undefined)[]
  current: number
}

export async function getPageWithRetry(
  url: string
): Promise<ComicListDataSourceProps> {
  try {
    let res = await axios.get<ComicListDataSourceProps & { error: boolean }>(
      url
    )
    if (res.data.error) throw new Error('')
    return res.data
  } catch (error) {
    console.error(error)
    return await getPageWithRetry(url)
  }
}

export function mergeData(
  data1: (DetailPageListItemProps | undefined)[],
  data2: (DetailPageListItemProps | undefined)[],
  page2: number,
  total: number
) {
  let res = []
  for (let i = 0; i < total; i++) {
    res[i] = data1[i] || data2[i - page2 * pageSize]
  }
  return res
}
