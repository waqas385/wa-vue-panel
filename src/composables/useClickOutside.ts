import { onMounted, onUnmounted, Ref } from 'vue'

export function useClickOutside(target: Ref<HTMLElement | null>, handler: () => void) {
  const listener = (event: MouseEvent) => {
    const el = target.value
    if (!el) return

    // Check if the click is inside the target element
    if (el === event.target || el.contains(event.target as Node)) {
      return
    }

    handler()
  }

  onMounted(() => {
    // Use mousedown instead of click to avoid conflict with the triggering click
    document.addEventListener('mousedown', listener)
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', listener)
  })
}