import { useEffect, useState } from 'react'

const useIsIosStandalone = () => {
  const [matches, setMatches] = useState(false)
  useEffect(() => {
    let bool =
      typeof window === 'undefined'
        ? false
        : matchMedia('(display-mode: standalone)').matches &&
          /((iphone)|(ipad))/.test(navigator.userAgent.toLowerCase())
    setMatches(bool)
  }, [])
  return matches
}

export default useIsIosStandalone
