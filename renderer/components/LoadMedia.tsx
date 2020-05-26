import React, { useState, useEffect } from 'react'
import { CardMedia, CardMediaProps, Hidden as div } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
const LoadMedia: React.FC<CardMediaProps<'img'>> = ({ src, ...rest }) => {
  const [count, setCount] = useState(0)
  const [href, setHref] = useState(src)
  const [loading, setLoading] = useState(true)
  const reload = () => {
    if (count > 5) {
      return
    }
    setCount(count + 1)
    setHref(src + '?ts=' + Math.random())
  }
  useEffect(() => setHref(src), [src])
  return (
    <React.Fragment>
      <div hidden={loading}>
        <CardMedia
          component="img"
          onError={() => {
            setTimeout(() => reload(), 500)
          }}
          onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
            rest.onLoad?.(e)
            setLoading(false)
          }}
          {...rest}
          src={href}
        />
      </div>
      {loading && (
        <Skeleton variant="rect" animation="wave" height={320}></Skeleton>
      )}
    </React.Fragment>
  )
}
export default LoadMedia
