import React, { useState, useEffect, useRef } from 'react'
import 'intersection-observer'
import { DetailPageListItemProps } from 'interface/gallery'
import useComicItemImage from 'hooks/useComicItem'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const pageSize = 20

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transition: theme.transitions.create('height'),
      marginBottom: theme.spacing(1),
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
  { index: number } & Partial<DetailPageListItemProps>
> = ({ index, thumb, url }) => {
  const classes = useStyles()
  const ref = useRef<HTMLDivElement>(null)
  const [pageUrl, setPageUrl] = useState(url)
  const [inViewport, setInViewport] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [aspectratio, setAspectratio] = useState<number>(210 / 297)
  const { data } = useComicItemImage(loaded && pageUrl ? pageUrl : null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInViewport(true)
            setLoaded((t) => {
              if (t) return t
              document.dispatchEvent(
                new CustomEvent('loadMorePage', {
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
      { rootMargin: `400px 0px 1800px 0px` }
    )
    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [index])

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
