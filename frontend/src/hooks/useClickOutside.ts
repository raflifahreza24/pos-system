import { useEffect, type RefObject } from 'react'

export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutside: () => void,
  active = true,
) {
  useEffect(() => {
    if (!active) return

    function handlePointerDown(event: PointerEvent) {
      const el = ref.current
      if (el && event.target instanceof Node && !el.contains(event.target)) {
        onOutside()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [ref, onOutside, active])
}
