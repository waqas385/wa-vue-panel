import { onMounted, onUnmounted } from 'vue'

export function useEscapeKey(handler: () => void) {
  const listener = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handler()
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', listener)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', listener)
  })
}