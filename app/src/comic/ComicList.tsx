import React, { useEffect } from 'react'
import ComicItem from './ComicItem'
import useSWR, { mutate, cache } from 'swr'
import {
  DetailPageListItemProps,
  commentListItemProps,
} from 'interface/gallery'
import { axios } from 'apis'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Loading from 'components/Loading'
import ComicStatus from './ComicStatus'
import ComicControls from './ComicControls'
import { EVENT_TOGGLE_CONTROLS, EVENT_LOAD_MORE_PAGE } from 'constant'

const pageSize = 20

interface ComicListDataSourceProps {
  total: number
  list: (DetailPageListItemProps | undefined)[]
  current: number
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1280,
      backgroundColor: 'black',
      minHeight: '100vh',
      position: 'relative',
      margin: theme.spacing(0, 'auto'),
    },
  })
)
let loadedPageKeys: boolean[] = []

const ComicList: React.FC<{ comicUrl: string; defaultCurrent: number }> = ({
  comicUrl,
  defaultCurrent,
}) => {
  const comicPagesKey = `${comicUrl}/read`

  const classes = useStyles()

  const { data } = useSWR<ComicListDataSourceProps>(comicPagesKey, {
    initialData: cache.get(comicPagesKey) || { current: 0, list: [], total: 0 },
  })
  useEffect(() => {
    if (defaultCurrent === -1) {
      return document
        .querySelector(`[data-index="${data?.current}"]`)
        ?.scrollIntoView()
    }
    document.querySelector(`[data-index="${defaultCurrent}"]`)?.scrollIntoView()
    mutate(comicPagesKey, (data: ComicListDataSourceProps) => ({
      ...(data ? data : { current: 0, list: [], total: 0 }),
      current: defaultCurrent,
    }))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicPagesKey, defaultCurrent])

  useEffect(() => {
    loadedPageKeys = [true]

    const fn = async () => {
      let res = await getPageWithRetry(`/api/gallery${comicUrl}/0`)
      mutate(
        comicPagesKey,
        (data: ComicListDataSourceProps) => ({
          ...data,
          total: res.total,
          list: mergeData(data?.list || [], res.list, 0, res.total),
        }),
        false
      )
    }
    fn()
    return () => {
      loadedPageKeys = []
    }
  }, [comicPagesKey, comicUrl])

  useEffect(() => {
    const fn = ((async (e: CustomEvent<number>) => {
      if (loadedPageKeys[e.detail]) return
      loadedPageKeys[e.detail] = true

      let res = await getPageWithRetry(`/api/gallery${comicUrl}/${e.detail}`)
      mutate(
        comicPagesKey,
        (data: ComicListDataSourceProps) => ({
          ...data,
          total: res.total,
          list: mergeData(data?.list || [], res.list, e.detail, res.total),
        }),

        false
      )
    }) as unknown) as EventListener
    document.addEventListener(EVENT_LOAD_MORE_PAGE, fn)

    return () => {
      document.removeEventListener(EVENT_LOAD_MORE_PAGE, fn)
    }
  }, [comicPagesKey, comicUrl, data])

  useEffect(() => {
    if (data?.list) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              mutate(comicPagesKey, (data: ComicListDataSourceProps) => ({
                ...data,
                current: +(entry.target.getAttribute('data-index') || 0),
              }))
            }
          }
        },
        { rootMargin: `-40% 0px -59.9% 0px` }
      )
      document.querySelectorAll('[role="comic-item"]').forEach((e) => {
        observer.observe(e)
      })

      return () => {
        observer.disconnect()
      }
    }
  }, [comicPagesKey, data?.list])

  if (!data || data.total === 0)
    return (
      <div className={classes.root}>
        <Loading />
      </div>
    )

  return (
    <>
      <div
        className={classes.root}
        onClick={() =>
          document.dispatchEvent(new CustomEvent(EVENT_TOGGLE_CONTROLS))
        }
      >
        {data.list.map((o, k) => (
          <ComicItem
            key={o?.url || k}
            index={k}
            thumb={o?.thumb}
            url={o?.url}
          />
        ))}
      </div>
      <ComicStatus total={data.total} current={data.current} />
      <ComicControls total={data.total} current={data.current} />
    </>
  )
}

export default ComicList

async function getPageWithRetry(
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

function mergeData(
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
