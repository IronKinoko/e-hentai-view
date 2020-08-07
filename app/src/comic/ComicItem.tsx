import React, { useState, useEffect, useRef } from 'react'
import 'intersection-observer'
import { DetailPageListItemProps } from 'interface/gallery'
import useComicItemImage from 'hooks/useComicItem'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { EVENT_LOAD_MORE_PAGE } from 'constant'
import { useComicConfigState, ComicConfigProps } from './ComicConfig'
import { pageSize } from './utils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transition: theme.transitions.create('height'),
      maxWidth: 1280,
      margin: theme.spacing(0, 'auto'),
      width: '100%',
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

const rootMargin = {
  ltf: '',
  rtl: '',
  vertical: '',
}

const ComicItem: React.FC<
  { index: number } & Partial<DetailPageListItemProps>
> = ({ index, thumb, url }) => {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)
  const [pageUrl, setPageUrl] = useState(url)
  const [inViewport, setInViewport] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [aspectratio, setAspectratio] = useState<number>(210 / 297)
  const { data } = useComicItemImage(loaded && pageUrl ? pageUrl : null)
  const [config, setConfig] = useComicConfigState()
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || config.direction !== 'vertical') {
            setInViewport(true)
            setLoaded((t) => {
              if (t) return t
              document.dispatchEvent(
                new CustomEvent(EVENT_LOAD_MORE_PAGE, {
                  detail: Math.floor(index / pageSize),
                })
              )
              return true
            })
          } else {
            setInViewport(false)
          }
        }
      },

      {
        rootMargin: '100% 0px 250% 0px',
      }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [index, config.direction])

  const minHeight = Math.min(window.innerWidth, 1280) / aspectratio
  return (
    <div
      ref={ref}
      style={{ minHeight }}
      className={classes.root}
      data-index={index}
      data-loaded={loaded}
      role="comic-item"
    >
      {!inViewport || !pageUrl ? (
        <div className={classes.placeholder} style={{ minHeight }}>
          {index + 1}
        </div>
      ) : data ? (
        <img
          src={data.url}
          className={classes.img}
          onError={(e) => {
            setPageUrl(url + '?nl=' + data.retryURL)
          }}
          onLoad={(e) => {
            setAspectratio(e.currentTarget.width / e.currentTarget.height)
          }}
        />
      ) : (
        <img
          src={thumb}
          className={classes.img}
          onLoad={(e) => {
            setAspectratio(e.currentTarget.width / e.currentTarget.height)
          }}
        />
      )}
    </div>
  )
}

export default ComicItem
