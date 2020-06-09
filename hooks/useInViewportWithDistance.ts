import { useRef, useLayoutEffect, useState, MutableRefObject } from 'react'
import 'intersection-observer'
type Arg = HTMLElement | (() => HTMLElement) | null
type InViewport = boolean | undefined

function isInViewPort(el: HTMLElement, distance = 0): boolean {
  if (!el) {
    return false
  }

  const viewPortWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  const viewPortHeight =
    (window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight) +
    distance * 2
  const rect = el.getBoundingClientRect()

  if (rect) {
    const { top, bottom, left, right } = rect
    return (
      bottom > 0 && top <= viewPortHeight && left <= viewPortWidth && right > 0
    )
  }

  return false
}

function useInViewportWithDistance<T extends HTMLElement = HTMLElement>(): [
  InViewport,
  MutableRefObject<T>
]
function useInViewportWithDistance<T extends HTMLElement = HTMLElement>(
  distance: number
): [InViewport, MutableRefObject<T>]
function useInViewportWithDistance<T extends HTMLElement = HTMLElement>(
  distance: number,
  arg: Arg
): [InViewport]
function useInViewportWithDistance<T extends HTMLElement = HTMLElement>(
  ...args: [number, Arg] | [number] | []
): [InViewport, MutableRefObject<T>?] {
  const element = useRef<T>()
  const hasPassedInElement = args.length === 2
  const distance = args[0] || 0
  const arg = useRef(args[1])
  ;[, arg.current] = args
  const [inViewPort, setInViewport] = useState<InViewport>(() => {
    const initDOM =
      typeof arg.current === 'function' ? arg.current() : arg.current

    return isInViewPort(initDOM as HTMLElement)
  })

  useLayoutEffect(() => {
    const passedInElement =
      typeof arg.current === 'function' ? arg.current() : arg.current

    const targetElement = hasPassedInElement ? passedInElement : element.current

    if (!targetElement) {
      return () => {}
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInViewport(true)
          } else {
            setInViewport(false)
          }
        }
      },
      {
        rootMargin: `${distance}px 0px `,
      }
    )

    observer.observe(targetElement)

    return () => {
      observer.disconnect()
    }
  }, [
    element.current,
    typeof arg.current === 'function' ? undefined : arg.current,
  ])

  if (hasPassedInElement) {
    return [inViewPort]
  }

  return [inViewPort, element as MutableRefObject<T>]
}

export default useInViewportWithDistance
