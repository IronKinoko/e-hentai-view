import React, { useEffect } from 'react'
import ComicItem from './ComicItem'
import useSWR, { mutate, cache } from 'swr'
import { DetailPageListItemProps } from 'interface/gallery'
import { axios } from 'apis'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Loading from 'components/Loading'
import ComicStatus from './ComicStatus'
import ComicControls from './ComicControls'
import {
  EVENT_TOGGLE_CONTROLS,
  EVENT_LOAD_MORE_PAGE,
  EVENT_JUMP_PAGE,
} from 'constant'
import {
  ComicListDataSourceProps,
  getPageWithRetry,
  mergeData,
  pageSize,
} from './utils'
import useComicData from 'hooks/useComicData'
import { useRouter } from 'next/router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1280,
      backgroundColor: 'black',
      minHeight: '100vh',
      position: 'relative',
      margin: theme.spacing(0, 'auto'),
      userSelect: 'none',
    },
  })
)

const ComicList: React.FC<{ comicUrl: string; defaultCurrent: number }> = ({
  comicUrl,
  defaultCurrent,
}) => {
  const comicPagesKey = `${comicUrl}/read`
  const classes = useStyles()
  const { data } = useComicData(comicUrl)
  const router = useRouter()
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

    const fn = (((e: CustomEvent<number>) => {
      document.querySelector(`[data-index="${e.detail}"]`)?.scrollIntoView()
    }) as unknown) as EventListener
    document.addEventListener(EVENT_JUMP_PAGE, fn)
    return () => {
      document.removeEventListener(EVENT_JUMP_PAGE, fn)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicPagesKey, defaultCurrent])

  useEffect(() => {
    if (data?.list) {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              let currentpage = +(entry.target.getAttribute('data-index') || 0)
              mutate(comicPagesKey, (data: ComicListDataSourceProps) => ({
                ...data,
                current: currentpage,
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
  }, [comicPagesKey, comicUrl, data?.list, router])

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
