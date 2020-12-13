import React, { useEffect, useState } from 'react'
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
  computedTargetHeight,
  computedFullHeight,
  computedCurrentTarget,
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
    virtualItem: {
      position: 'absolute',
      transition: 'transform 0.3s ease',
      width: '100%',
      maxWidth: 1280,
    },
  })
)
const ComicList: React.FC<{ comicUrl: string; defaultCurrent: number }> = ({
  comicUrl,
  defaultCurrent,
}) => {
  const comicPagesKey = `${comicUrl}/read`
  const classes = useStyles()
  const [loaded, setLoaded] = useState(false)
  const { data } = useComicData(comicUrl)
  const router = useRouter()
  useEffect(() => {
    if (data && !loaded) {
      setLoaded(true)
      if (defaultCurrent === -1) {
        document.scrollingElement!.scrollTop = computedTargetHeight(
          data.current,
          data.list
        )
      } else {
        document.scrollingElement!.scrollTop = computedTargetHeight(
          defaultCurrent,
          data.list
        )
        mutate(comicPagesKey, (data: ComicListDataSourceProps) => ({
          ...(data ? data : { current: 0, list: [], total: 0 }),
          current: defaultCurrent,
        }))
      }
    }
  }, [comicPagesKey, defaultCurrent, data, loaded])

  useEffect(() => {
    const fn = () => {
      if (document.scrollingElement) {
        const top = document.scrollingElement.scrollTop
        mutate(comicPagesKey, (data: ComicListDataSourceProps) => {
          const current = computedCurrentTarget(data.list, top)
          if (current !== data.current) {
            return { ...data, current }
          }
        })
      }
    }
    document.addEventListener('scroll', fn)
    return () => {
      document.removeEventListener('scroll', fn)
    }
  }, [comicPagesKey])

  useEffect(() => {
    if (data?.list) {
      const fn = (((e: CustomEvent<number>) => {
        if (data.current !== e.detail) {
          document.scrollingElement!.scrollTop = computedTargetHeight(
            e.detail,
            data.list
          )
          mutate(comicPagesKey, (data: ComicListDataSourceProps) => ({
            ...data,
            current: e.detail,
          }))
        }
      }) as unknown) as EventListener
      document.addEventListener(EVENT_JUMP_PAGE, fn)
      return () => {
        document.removeEventListener(EVENT_JUMP_PAGE, fn)
      }
    }
  }, [comicPagesKey, data])

  if (!data || data.total === 0)
    return (
      <div className={classes.root}>
        <Loading />
      </div>
    )

  const start = Math.max(data.current - 2, 0)
  const end = Math.min(data.current + 5, data.total)
  return (
    <>
      <div
        className={classes.root}
        onClick={() =>
          document.dispatchEvent(new CustomEvent(EVENT_TOGGLE_CONTROLS))
        }
        style={{
          minHeight: computedFullHeight(data.list),
          position: 'relative',
        }}
      >
        {data.list.slice(start, end).map((o, v) => {
          const k = v + start
          return (
            <div
              key={o?.url || k}
              className={classes.virtualItem}
              style={{
                transform: `translateY(${computedTargetHeight(
                  k,
                  data.list
                )}px)`,
              }}
            >
              <ComicItem
                index={k}
                thumb={o?.thumb}
                url={o?.url}
                aspectratio={o?.aspectratio}
                comicPagesKey={comicPagesKey}
              />
            </div>
          )
        })}
      </div>
      <ComicStatus total={data.total} current={data.current} />
      <ComicControls total={data.total} current={data.current} />
    </>
  )
}

export default ComicList
