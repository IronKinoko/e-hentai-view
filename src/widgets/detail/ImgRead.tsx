import { loadImg } from '@/apis'
import LoadMedia from '@/components/LoadMedia'
import { DetailPageListItemProps } from '@/interface/gallery'
import { Backdrop, Container, Fab, Grid, Zoom } from '@mui/material'
import { alpha, Theme } from '@mui/material/styles'
import createStyles from '@mui/styles/createStyles'
import makeStyles from '@mui/styles/makeStyles'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useUpdateEffect } from 'ahooks'
import { range } from 'lodash-es'
import React, { useEffect, useRef, useState } from 'react'
let cacheId: boolean[] = []
const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: 'rgba(0,0,0)',
      overflow: 'auto',
      overflowX: 'hidden',
      display: 'block',
      userSelect: 'none',
    },
    container: {
      position: 'relative',
      minHeight: 100,
    },
    fabContainer: {
      position: 'absolute',
      right: 10,
      top: 0,
      bottom: 10,
    },
    fab: {
      marginTop: 10,
      position: 'sticky',
      top: 10,
    },
    info: {
      position: 'fixed',
      bottom: 10,
      background: alpha(theme.palette.grey['800'], 0.5),
      padding: theme.spacing(0.5, 1),
      borderRadius: '16px 0 0 16px',
      right: 0,
      color: theme.palette.common.white,
      [theme.breakpoints.up('lg')]: {
        right: 'calc((100vw - 1280px) / 2)',
      },
    },
  })
)

interface ImgReadProps {
  open: boolean
  defaultValue: number
  dataSource: DetailPageListItemProps[]
  onClose: (index: number) => void
  total: number
  loadMore: () => void
}
const ImgRead: React.FC<ImgReadProps> = ({
  open,
  defaultValue,
  dataSource,
  onClose,
  total,
  loadMore: loadNextPage,
}) => {
  const ref = useRef<HTMLDivElement>()
  const classes = useStyle()
  const [cacheImg, setCacheImg] = useState<string[]>([])
  const [index, setIndex] = useState(defaultValue)
  const [errorMap, setErrorMap] = useState<{ [n: number]: boolean }>({})
  const [freshKey, setFreshKey] = useState(0)
  useEffect(() => {
    cacheId = []
    return () => {
      cacheId = []
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const fn = () => {
      document.getElementById(`img${index}`)?.scrollIntoView()
    }
    window.addEventListener('resize', fn)
    return () => {
      window.removeEventListener('resize', fn)
    }
  }, [index])

  useEffect(() => {
    let intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry?.intersectionRatio) {
            let idx = parseInt(entry.target.id.slice(3))
            setIndex(idx)
          }
        })
      },
      { rootMargin: '-50% 0px -49% 0px' }
    )
    if (ref.current) {
      Array.from(ref.current.querySelectorAll('[id^="img"]')!).forEach(
        (entry) => {
          intersectionObserver.observe(entry)
        }
      )
    }
  }, [cacheImg])

  useEffect(() => {
    setCacheImg((t) => {
      return dataSource.map((o, k) => {
        return t[k] || o.thumb
      })
    })
  }, [dataSource])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setIndex(defaultValue)
      document.getElementById(`img${defaultValue}`)?.scrollIntoView()
    } else {
      document.body.style.overflow = ''
    }
  }, [defaultValue, open])

  useUpdateEffect(() => {
    const loadMore = async () => {
      let indexArr = range(
        Math.max(-1, index - 1),
        Math.min(index + 6, dataSource.length)
      )
      if (dataSource.length - 8 < index) loadNextPage()
      indexArr.push(indexArr.shift()!)
      for (let i of indexArr) {
        if (!dataSource[i]) continue
        let url = dataSource[i].url
        if (cacheId[i]) continue
        cacheId[i] = true

        let res = await loadImg(url)
        if (res.error) {
          cacheId[i] = false
          setFreshKey(Math.random())
          continue
        }
        dataSource[i].url = dataSource[i].url + '?nl=' + res.retryURL
        setCacheImg((t) => {
          t[i] = res.url + '?t=' + freshKey
          return [...t]
        })
      }
    }
    loadMore()
  }, [dataSource, index, freshKey])

  return (
    <Backdrop
      open={open}
      className={classes.root}
      onClick={() => onClose(index)}
      ref={ref}
    >
      <Container maxWidth="lg" disableGutters className={classes.container}>
        <Grid container spacing={1} direction="column" wrap="nowrap">
          {cacheImg.map((url, k) => (
            <Grid item key={k} id={`img${k}`}>
              <div className={classes.container}>
                <LoadMedia
                  src={url}
                  fullWidth
                  onError={() => {
                    setErrorMap((t) => ({ ...t, [k]: true }))
                  }}
                  onLoad={() => {
                    setErrorMap((t) => ({ ...t, [k]: false }))
                  }}
                />
                <div className={classes.fabContainer}>
                  <Zoom
                    in={k >= index - 1 && k <= index + 1 && errorMap[k]}
                    unmountOnExit
                  >
                    <Fab
                      className={classes.fab}
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation()
                        cacheId[k] = false
                        setFreshKey(Math.random())
                      }}
                    >
                      <RefreshIcon />
                    </Fab>
                  </Zoom>
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
        <div className={classes.info}>
          {index + 1}/{total}
        </div>
      </Container>
    </Backdrop>
  )
}

export default ImgRead
