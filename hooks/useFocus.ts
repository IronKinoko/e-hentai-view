import React, { useRef, useEffect, useState } from 'react'

export default function useFocus<T extends HTMLElement = HTMLElement>(): [
  boolean,
  React.MutableRefObject<T>
] {
  const ref = useRef<T>()
  const [isFocus, setIsFocus] = useState(false)

  useEffect(() => {
    let element = ref.current

    const focusFn = () => {
      setIsFocus(true)
    }
    const blurFn = () => {
      setIsFocus(false)
    }
    if (element) {
      element.addEventListener('focus', focusFn)
      element.addEventListener('blur', blurFn)
    }

    return () => {
      if (element) {
        element.removeEventListener('focus', focusFn)
        element.removeEventListener('blur', blurFn)
      }
    }
  }, [])

  return [isFocus, ref as React.MutableRefObject<T>]
}
