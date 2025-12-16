<template>
  <div
    v-if="show"
    :class="[
        fullscreen
        ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm m-0 p-0'
        : 'flex items-center justify-center bg-gray-50 min-h-screen'
    ]"
    >
    <div class="text-center">
      <div
        class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"
      ></div>
      <p class="text-gray-600">Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean
  fullscreen?: boolean
}>()
</script>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>