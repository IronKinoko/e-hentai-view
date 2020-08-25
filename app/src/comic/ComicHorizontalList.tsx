import React, { useEffect, useState, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Controller, Virtual } from 'swiper'
import { ComicListDataSourceProps } from './utils'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import useSWR, { cache, mutate } from 'swr'
import Loading from 'components/Loading'
import ComicItem from './ComicItem'
import { EVENT_TOGGLE_CONTROLS, EVENT_JUMP_PAGE } from 'constant'
import ComicStatus from './ComicStatus'
import ComicControls from './ComicControls'
import useComicData from 'hooks/useComicData'
import { useComicConfigState } from './ComicConfig'
import clsx from 'clsx'

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
  const [swiperController, setSwiperController] = useState<SwiperCore | null>(
    null
  )

  const [config, setConfig] = useComicConfigState()

  useEffect(() => {
    if (swiperController) {
      if (defaultCurrent === -1) {
        return swiperController.slideTo(data?.current || 0, 0)
      }
      swiperController.slideTo(defaultCurrent, 0)
      mutate(comicPagesKey, (data: ComicListDataSourceProps) => ({
        ...(data ? data : { current: 0, list: [], total: 0 }),
        current: defaultCurrent,
      }))

      const fn = (((e: CustomEvent<number>) => {
        swiperController.slideTo(e.detail, 0)
      }) as unknown) as EventListener
      document.addEventListener(EVENT_JUMP_PAGE, fn)
      return () => {
        document.removeEventListener(EVENT_JUMP_PAGE, fn)
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicPagesKey, swiperController, defaultCurrent])

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
          minHeight: typeof window === 'undefined' ? 0 : window.innerHeight,
        }}
      >
        <Loading />
      </div>
    )
  return (
    <div className={classes.root}>
      <div
        onClick={() =>
          document.dispatchEvent(new CustomEvent(EVENT_TOGGLE_CONTROLS))
        }
      >
        <Swiper
          key={config.direction}
          dir={config.direction}
          onSlideChange={handleSliderChange}
          onSwiper={setSwiperController}
          virtual={{ addSlidesAfter: 3 }}
        >
          {data.list.map((o, k) => (
            <SwiperSlide key={o?.url ?? k} data-hovindex={k}>
              <div
                className={classes.imgContainer}
                style={{
                  minHeight:
                    typeof window === 'undefined' ? 0 : window.innerHeight,
                }}
              >
                <ComicItem
                  key={o?.url || k}
                  index={k}
                  thumb={o?.thumb}
                  url={o?.url}
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
