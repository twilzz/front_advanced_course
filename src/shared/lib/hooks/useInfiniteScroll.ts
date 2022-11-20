import { MutableRefObject, useEffect, useRef } from 'react'

export interface UseInfiniteScrollOptions {
  callback?: () => void
  triggerRef: MutableRefObject<HTMLElement>
  wrapperRef: MutableRefObject<HTMLElement>
}
export function useInfiniteScroll({
  callback,
  triggerRef,
  wrapperRef,
}: UseInfiniteScrollOptions) {
  let observer = useRef<IntersectionObserver | null>(null)
  useEffect(() => {
    const wrapperElement = wrapperRef.current
    const triggerElement = triggerRef.current
    if (callback) {
      const options = {
        root: wrapperElement,
        rootMargin: '0px',
        threshold: 1.0,
      }

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          callback()
        }
      }, options)
      observer.current?.observe(triggerElement)
    }

    return () => {
      if (observer.current && triggerElement) {
        observer.current?.unobserve(triggerElement)
      }
    }
  }, [triggerRef, wrapperRef, observer])
}
