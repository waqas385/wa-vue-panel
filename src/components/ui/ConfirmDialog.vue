<template>
  <Dialog :open="open" @close="handleCancel">
    <!-- Header -->
    <template #header>
      <h2 class="text-lg font-semibold text-red-900">
        {{ title }}
      </h2>
    </template>

    <!-- Body -->
    <div class="leading-relaxed text-gray-700">
      <slot>
        <!-- Optional fallback if no slot is provided -->
        Are you sure you want to continue?
      </slot>
    </div>

    <!-- Footer -->
    <template #footer>
      <button class="btn btn-secondary" @click="handleCancel">
        {{ cancelText }}
      </button>

      <button class="btn btn-primary" @click="handleConfirm">
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
