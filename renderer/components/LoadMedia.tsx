import React, { useState, useEffect } from 'react'
import { CardMedia, CardMediaProps } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
interface LoadMediaProps extends CardMediaProps<'img'> {
  fullWidth?: boolean
}
const LoadMedia: React.FC<LoadMediaProps> = ({ src, fullWidth, ...rest }) => {
  const [count, setCount] = useState(0)
  const [href, setHref] = useState(src)
  const [loading, setLoading] = useState(true)
  const [long, setLong] = useState(true)
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
      <CardMedia
        component="img"
        hidden={loading}
        onError={() => {
          setTimeout(() => reload(), 500)
        }}
        style={{
          width: fullWidth ? '100%' : '',
          objectFit: long ? 'cover' : 'contain',
        }}
        onLoad={(e: React.SyntheticEvent<HTMLImageElement>) => {
          rest.onLoad?.(e)

          setLoading(false)

          if (e.currentTarget.naturalWidth > e.currentTarget.naturalHeight) {
            setLong(false)
          }
        }}
        {...rest}
        src={href}
      />

      {loading && (
        <Skeleton variant="rect" animation="wave" height={320}></Skeleton>
      )}
    </React.Fragment>
  )
}
export default LoadMedia
