import Loading from '@/components/Loading'
import { EVENT_JUMP_PAGE, EVENT_TOGGLE_CONTROLS } from '@/constant'
import useComicData from '@/hooks/useComicData'
import useEventManager from '@/hooks/useEventListenerEnhance'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import React, { useEffect, useRef, useState } from 'react'
import SwiperCore, { Controller, Virtual } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.min.css'
import { mutate } from 'swr'
import { useComicConfigState } from './ComicConfig'
import ComicControls from './ComicControls'
import ComicItem from './ComicItem'
import ComicStatus from './ComicStatus'
import { ComicListDataSourceProps } from './utils'

SwiperCore.use([Controller, Virtual])

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1280,
      backgroundColor: theme.palette.background.default,
      margin: theme.spacing(0, 'auto'),
      position: 'relative',
      userSelect: 'none',
    },
    imgContainer: {
      display: 'flex',
      alignItems: 'center',
      height: '100vh',
      '& img': {
        width: 'auto',
        maxWidth: '100%',
        minHeight: 'unset !important',
        maxHeight: '100vh',
        display: 'block',
        margin: '0 auto',
      },
    },
  })
)

const ComicHorizontalList: React.FC<{
  comicUrl: string
  defaultCurrent: number
}> = ({ comicUrl, defaultCurrent }) => {
  const comicPagesKey = `${comicUrl}/read`
  const classes = useStyles()
  const { data } = useComicData(comicUrl)
  const toggleContorls$ = useEventManager(EVENT_TOGGLE_CONTROLS)
  const jumpPage$ = useEventManager(EVENT_JUMP_PAGE)

  const [swiperController, setSwiperController] = useState<SwiperCore | null>(
    null
  )

  const [config] = useComicConfigState()
  const dataRef = useRef(data)
  dataRef.current = data
  const defaultCurrentRef = useRef(defaultCurrent)
  defaultCurrentRef.current = defaultCurrent
  useEffect(() => {
    if (swiperController) {
      if (defaultCurrentRef.current === -1) {
        swiperController.slideTo(dataRef.current?.current || 0, 0)
        return () => {}
      }
      swiperController.slideTo(defaultCurrentRef.current, 0)
      mutate(comicPagesKey, (data: ComicListDataSourceProps) => ({
        ...(data ? data : { current: 0, list: [], total: 0 }),
        current: defaultCurrentRef.current,
      }))

      return jumpPage$.subscribe((pageIndex: number) => {
        swiperController.slideTo(pageIndex, 0)
      })
    }
  }, [comicPagesKey, jumpPage$, swiperController])

  const handleSliderChange = (swiper: SwiperCore) => {
    mutate(comicPagesKey, (data: ComicListDataSourceProps) => ({
      ...(data ? data : { current: 0, list: [], total: 0 }),
      current: swiper.realIndex,
    }))
  }

  if (!data || data.total === 0)
    return (
      <div
        className={classes.root}
        style={{
          height: '100vh',
        }}
      >
        <Loading />
      </div>
    )
  return (
    <div className={classes.root}>
      <div onClick={() => toggleContorls$.emit()}>
        <Swiper
          key={config.direction}
          dir={config.direction}
          onSlideChange={handleSliderChange}
          onSwiper={setSwiperController}
          virtual={{ addSlidesAfter: 3 }}
        >
          {data.list.map((o, k) => (
            <SwiperSlide key={o?.url ?? k} data-hovindex={k}>
              <div className={classes.imgContainer}>
                <ComicItem
                  key={o?.url || k}
                  index={k}
                  thumb={o?.thumb}
                  url={o?.url}
                  comicPagesKey={comicPagesKey}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <ComicStatus total={data.total} current={data.current} />
      <ComicControls total={data.total} current={data.current} />
    </div>
  )
}

export default ComicHorizontalList
