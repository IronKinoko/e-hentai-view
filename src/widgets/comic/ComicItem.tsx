import { EVENT_LOAD_MORE_PAGE } from '@/constant'
import useComicItemImage from '@/hooks/useComicItem'
import useEventManager from '@/hooks/useEventListenerEnhance'
import { DetailPageListItemProps } from '@/interface/gallery'
import { Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import 'intersection-observer'
import React, { useEffect, useRef, useState } from 'react'
import { mutate } from 'swr'
import {
  ComicListDataSourceProps,
  computedAspectratioHeight,
  pageSize,
} from './utils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transition: theme.transitions.create('height'),
      maxWidth: 1280,
      margin: theme.spacing(0, 'auto'),
      width: '100%',
      userSelect: 'none',
      display: 'flex',
      alignItems: 'center',
    },
    img: { width: '100%' },
    placeholder: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...theme.typography.h4,
    },
  })
)

const ComicItem: React.FC<
  Partial<DetailPageListItemProps> & {
    index: number
    comicPagesKey: string
    noMinHeight?: boolean
  }
> = ({
  index,
  thumb,
  url,
  aspectratio = 210 / 297,
  comicPagesKey,
  noMinHeight,
}) => {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)
  const [pageUrl, setPageUrl] = useState(url)
  const { data } = useComicItemImage(pageUrl ? pageUrl : null)
  const loadMorePage$ = useEventManager(EVENT_LOAD_MORE_PAGE)
  useEffect(() => {
    loadMorePage$.emit(Math.floor((index + 7) / pageSize))
  }, [index, loadMorePage$])

  const minHeight = computedAspectratioHeight(aspectratio)

  return (
    <div
      ref={ref}
      style={{ minHeight: noMinHeight ? '' : minHeight }}
      className={classes.root}
      data-index={index}
      // eslint-disable-next-line jsx-a11y/aria-role
      role="comic-item"
    >
      {data ? (
        <img
          src={data.url}
          alt={index.toString()}
          className={classes.img}
          onError={() => {
            setPageUrl(url + '?nl=' + data.retryURL)
          }}
          onLoad={(e) => {
            if (e.currentTarget.width / e.currentTarget.height === aspectratio)
              return
            mutate(comicPagesKey, (data: ComicListDataSourceProps) => {
              data.list[index]!.aspectratio =
                e.currentTarget.width / e.currentTarget.height
              return { ...data }
            })
          }}
        />
      ) : (
        <img
          src={thumb}
          alt={index.toString()}
          className={classes.img}
          onLoad={(e) => {
            if (e.currentTarget.width / e.currentTarget.height === aspectratio)
              return
            mutate(comicPagesKey, (data: ComicListDataSourceProps) => {
              data.list[index]!.aspectratio =
                e.currentTarget.width / e.currentTarget.height
              return { ...data }
            })
          }}
        />
      )}
    </div>
  )
}

export default ComicItem
