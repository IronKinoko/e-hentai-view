import React, { useState, useEffect, useRef } from 'react'
import 'intersection-observer'
import { DetailPageListItemProps } from 'interface/gallery'
import useComicItemImage from 'hooks/useComicItem'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { EVENT_LOAD_MORE_PAGE } from 'constant'
import { useComicConfigState, ComicConfigProps } from './ComicConfig'
import {
  pageSize,
  ComicListDataSourceProps,
  computedAspectratioHeight,
} from './utils'
import { mutate } from 'swr'

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
  Partial<DetailPageListItemProps> & { index: number; comicPagesKey: string }
> = ({ index, thumb, url, aspectratio = 210 / 297, comicPagesKey }) => {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)
  const [pageUrl, setPageUrl] = useState(url)
  const { data } = useComicItemImage(pageUrl ? pageUrl : null)
  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent(EVENT_LOAD_MORE_PAGE, {
        detail: Math.floor(index / pageSize),
      })
    )
  }, [index])

  const minHeight = computedAspectratioHeight(aspectratio)

  return (
    <div
      ref={ref}
      style={{ minHeight }}
      className={classes.root}
      data-index={index}
      role="comic-item"
    >
      {data ? (
        <img
          src={data.url}
          className={classes.img}
          onError={(e) => {
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
