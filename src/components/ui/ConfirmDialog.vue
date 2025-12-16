<template>
  <Dialog :open="open" @close="handleCancel">
    <!-- Header -->
    <template #header>
      <h2 class="text-lg font-semibold text-red-900">
        {{ title }}
      </h2>
    </template>

    <!-- Body -->
    <div class="text-gray-700 leading-relaxed">
      {{ message }}
    </div>

    <!-- Footer -->
    <template #footer>
      <button
        class="btn btn-secondary"
        @click="handleCancel"
      >
        {{ cancelText }}
      </button>

      <button
        class="btn btn-primary"
        @click="handleConfirm"
      >
        {{ confirmText }}
      </button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from '@/components/ui/Dialog.vue'

const props = defineProps<{
  open: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits(['confirm', 'cancel', 'close'])

function handleConfirm() {
  emit('confirm')
  emit('close')
}

function handleCancel() {
  emit('cancel')
  emit('close')
}
</script>