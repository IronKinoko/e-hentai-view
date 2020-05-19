import React, { useState, useEffect } from 'react'
import { CardMedia, CardMediaProps } from '@material-ui/core'
const LoadMedia: React.FC<CardMediaProps<'img'>> = ({ src, ...rest }) => {
  const [count, setCount] = useState(0)
  const [href, setHref] = useState(src)
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
        onError={() => {
          setTimeout(() => reload(), 500)
        }}
        {...rest}
        src={href}
      />
    </React.Fragment>
  )
}
export default LoadMedia
