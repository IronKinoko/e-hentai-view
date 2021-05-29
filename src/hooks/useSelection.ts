import { MutableRefObject, useCallback, useEffect, useRef } from 'react'

function useSelection<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>()

  const handler = useCallback(() => {
    const el = ref.current
    if (!el) return
    const range = document.createRange()
    range.selectNodeContents(el)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
  }, [ref])

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener('click', handler)
    }
  }, [handler, ref])
  return ref as MutableRefObject<T>
}

export default useSelection
