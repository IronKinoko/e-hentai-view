import React, { useRef, useEffect } from 'react'

const useIsIosStandalone = () => {
  const ref = useRef(false)
  useEffect(() => {
    ref.current =
      typeof window === 'undefined'
        ? false
        : matchMedia('(display-mode: standalone)').matches &&
          /((iphone)|(ipad))/.test(navigator.userAgent.toLowerCase())
  }, [])
  return ref.current
}

export default useIsIosStandalone
