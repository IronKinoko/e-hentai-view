import useInViewportWithDistance from '@/hooks/useInViewportWithDistance'
import { CardMedia, CardMediaProps } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'

import ProxyImg from './ProxyImg'
interface LoadMediaProps extends CardMediaProps<'img'> {
  fullWidth?: boolean
  lazy?: boolean
}
const LoadMedia: React.FC<LoadMediaProps> = ({
  src,
  fullWidth,
  lazy,
  onLoad,
  ...rest
}) => {
  const [count, setCount] = useState(0)
  const [href, setHref] = useState<string | undefined>(
    '/static/transparent.png'
  )
  const [wide, setWide] = useState(false)
  const [inview, ref] = useInViewportWithDistance<HTMLImageElement>(600)
  const reload = useCallback(() => {
    if (count > 5) {
      return
    }
    setCount(count + 1)
    setHref(src + '?ts=' + Math.random())
  }, [count, src])

  useEffect(() => {
    if (lazy) {
      inview && setHref(src)
    } else {
      setHref(src)
    }
  }, [inview, lazy, src])
  return (
    <CardMedia ref={ref} {...rest}>
      <ProxyImg
        onError={() => {
          setTimeout(() => reload(), 500)
        }}
        style={{
          display: 'block',
          width: '100%',
          objectFit: wide ? 'contain' : undefined,
          userSelect: 'none',
        }}
        height={rest.height}
        onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
          onLoad?.(e)
          setWide(e.currentTarget.naturalWidth > e.currentTarget.naturalHeight)
        }}
        src={href}
      />
    </CardMedia>
  )
}
export default LoadMedia
