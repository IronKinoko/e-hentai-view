import useSWR, { ConfigInterface, responseInterface } from 'swr'
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
const axios = Axios.create({
  baseURL: 'https://e-hentai-node.du.r.appspot.com',
  withCredentials: true,
})
export type GetRequest = AxiosRequestConfig | null

interface Return<Data, Error>
  extends Pick<
    responseInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'revalidate' | 'error' | 'mutate'
  > {
  data: Data | undefined
  response: AxiosResponse<Data> | undefined
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    ConfigInterface<AxiosResponse<Data>, AxiosError<Error>>,
    'initialData'
  > {
  initialData?: Data
}

export default function useRequest<Data = unknown, Error = unknown>(
  request: GetRequest,
  { initialData, ...config }: Config<Data, Error> = {}
): Return<Data, Error> {
  const { data: response, error, isValidating, revalidate, mutate } = useSWR<
    AxiosResponse<Data>,
    AxiosError<Error>
  >(
    request && JSON.stringify(request),
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    () => axios(request!),
    {
      ...config,
      // @ts-ignore
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        config: request,
        headers: {},
        data: initialData,
      },
    }
  )

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    revalidate,
    mutate,
  }
}
