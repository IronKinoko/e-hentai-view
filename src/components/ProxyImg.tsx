import { ImgHTMLAttributes, forwardRef, useMemo } from 'react'

const ProxyImg = forwardRef<
  HTMLImageElement,
  ImgHTMLAttributes<HTMLImageElement>
>((props, ref) => {
  const { src, alt, ...rest } = props

  const finalSrc = useMemo(() => {
    if (!src) return ''
    if (!src.startsWith('http')) return src
    return src ? '/api/gallery/proxy?url=' + encodeURIComponent(src) : ''
  }, [src])

  return <img ref={ref} {...rest} src={finalSrc} alt={alt} />
})

ProxyImg.displayName = 'ProxyImg'

export default ProxyImg
