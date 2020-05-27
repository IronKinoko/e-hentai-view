import React, { useState, useEffect, useRef } from 'react'
import { Backdrop, Container, Grid } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import LoadMedia from 'components/LoadMedia'
import { Page } from 'apis'
import { range } from 'lodash'
import { useUpdateEffect } from '@umijs/hooks'
let cacheId: boolean[] = []
const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: 'rgba(0,0,0)',
      overflow: 'auto',
      display: 'block',
      userSelect: 'none',
    },
  })
)

interface ImgReadProps {
  open: boolean
  defaultValue: number
  dataSource: Page.DetailPageListItemProps[]
  onClose: () => void
}
const ImgRead: React.FC<ImgReadProps> = ({
  open,
  defaultValue,
  dataSource,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>()
  const classes = useStyle()
  const [cacheImg, setCacheImg] = useState<string[]>([])
  const [index, setIndex] = useState(defaultValue)
  useEffect(() => {
    cacheId = []
    return () => {
      cacheId = []
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    let intersectionObserver = new IntersectionObserver(
      (entries) => {
        let entry = entries.pop()
        if (entry?.intersectionRatio) {
          let idx = entry.target.id.slice(3)
          setIndex(+idx)
        }
      },
      { rootMargin: '0px 0px 200% 0px' }
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
    console.log(open)
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
        Math.max(0, index - 1),
        Math.min(index + 3, dataSource.length)
      )
      indexArr.push(indexArr.shift()!)
      for (let i of indexArr) {
        if (!dataSource[i]) break
        let url = dataSource[i].url
        if (cacheId[i]) continue
        cacheId[i] = true

        let res = await Page.LoadImg(url)
        setCacheImg((t) => {
          t[i] = res
          return [...t]
        })
      }
    }
    loadMore()
  }, [dataSource, index])

  return (
    <Backdrop open={open} className={classes.root} onClick={onClose} ref={ref}>
      <Container maxWidth="lg">
        <Grid container spacing={1} direction="column" wrap="nowrap">
          {cacheImg.map((i, k) => (
            <Grid item key={k} id={`img${k}`}>
              <LoadMedia src={i} fullWidth />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Backdrop>
  )
}

export default ImgRead
