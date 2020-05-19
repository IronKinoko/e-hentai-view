import React, { useState, useEffect, useRef } from 'react'
import { Backdrop, Container, Grid } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import LoadMedia from 'components/LoadMedia'
import { Page } from 'apis'

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
  }),
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
  const loadMore = async () => {
    for (let i = index - 3; i < index + 5 && i < dataSource.length; i++) {
      if (i < 0) continue
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

  useEffect(() => {
    let intersectionObserver = new IntersectionObserver(
      (entries) => {
        let entry = entries.pop()
        if (entry?.intersectionRatio) {
          let idx = entry.target.id.slice(3)
          setIndex(+idx)
        }
      },
      { rootMargin: '0px 0px 200% 0px' },
    )
    if (ref.current) {
      Array.from(ref.current.querySelectorAll('[id^="img"]')!).forEach(
        (entry) => {
          intersectionObserver.observe(entry)
        },
      )
    }
  }, [cacheImg])

  useEffect(() => {
    console.log(open)
    if (open) {
      document.body.style.overflow = 'hidden'
      setIndex(defaultValue)
      document.getElementById(`img${defaultValue}`)?.scrollIntoView()
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    loadMore()
  }, [index])

  return (
    <Backdrop open={open} className={classes.root} onClick={onClose} ref={ref}>
      <Container maxWidth="lg">
        <Grid container spacing={1} alignItems="center" direction="column">
          {cacheImg.map((i, k) => (
            <Grid item key={k} id={`img${k}`}>
              <LoadMedia src={i} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Backdrop>
  )
}

export default ImgRead
