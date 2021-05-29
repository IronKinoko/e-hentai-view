import { EVENT_JUMP_PAGE, EVENT_TOGGLE_CONTROLS } from '@/constant'
import useComicData from '@/hooks/useComicData'
import useEventManager from '@/hooks/useEventListenerEnhance'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { useEventListener } from 'ahooks'
import { useMount } from 'ahooks'
import React, { useEffect, useRef } from 'react'
import { mutate } from 'swr'
import ComicControls from './ComicControls'
import ComicItem from './ComicItem'
import ComicStatus from './ComicStatus'
import {
  ComicListDataSourceProps,
  computedCurrentTarget,
  computedFullHeight,
  computedTargetHeight,
} from './utils'

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
  const { data } = useComicData(comicUrl)
  const dataRef = useRef(data)
  dataRef.current = data

  const jumpPage$ = useEventManager(EVENT_JUMP_PAGE)
  const toggleControls$ = useEventManager(EVENT_TOGGLE_CONTROLS)

  useMount(() => {
    if (defaultCurrent === -1) {
      document.scrollingElement!.scrollTop = computedTargetHeight(
        data!.current,
        data!.list
      )
    } else {
      document.scrollingElement!.scrollTop = computedTargetHeight(
        defaultCurrent,
        data!.list
      )
      mutate(comicPagesKey, (data: ComicListDataSourceProps) => ({
        ...data,
        current: defaultCurrent,
      }))
    }
  })

  useEffect(() => {
    return jumpPage$.subscribe((pageIndex: number) => {
      if (!dataRef.current) return
      if (dataRef.current.current !== pageIndex) {
        document.scrollingElement!.scrollTop = computedTargetHeight(
          pageIndex,
          dataRef.current.list
        )
        mutate(comicPagesKey, (data: ComicListDataSourceProps) => ({
          ...data,
          current: pageIndex,
        }))
      }
    })
  }, [comicPagesKey, jumpPage$])

  useEventListener('scroll', () => {
    if (document.scrollingElement) {
      const top = document.scrollingElement.scrollTop
      mutate(comicPagesKey, (data: ComicListDataSourceProps) => {
        const current = computedCurrentTarget(data.list, top)
        if (current !== data.current) {
          return { ...data, current }
        }
      })
    }
  })

  if (!data || data.total === 0) return null

  const start = Math.max(data.current - 2, 0)
  const end = Math.min(data.current + 5, data.total)
  return (
    <>
      <div
        className={classes.root}
        onClick={() => toggleControls$.emit()}
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
