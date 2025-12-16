<template>
  <teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <!-- Dialog container -->
      <div
        ref="dialogRef"
        class="w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-xl flex flex-col"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-gray-200 p-6">
          <slot name="header" />
          <button @click="close" class="text-gray-400 hover:text-gray-600">
            <SvgIcon name="cross" class="h-6 w-6" />
          </button>
        </div>

        <!-- Body -->
        <div class="p-6 overflow-y-auto">
          <slot />
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-3 border-t border-gray-200 bg-gray-50 p-6">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { useEscapeKey } from '@/composables/useEscapeKey'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])

function close() {
  emit('close')
}

const dialogRef = ref<HTMLElement | null>(null)


useClickOutside(dialogRef, () => {
  if (props.open) close()
})

useEscapeKey(() => {
  if (props.open) close()
})
</script>