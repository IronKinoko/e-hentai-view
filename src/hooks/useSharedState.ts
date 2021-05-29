import useSWR from 'swr'

export default function useSharedState<T>(key: string, initialData: T) {
  return useSWR(key, null, {
    initialData,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
}
