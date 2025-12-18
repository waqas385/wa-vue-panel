<template>
  <div
    v-if="show"
    :class="[
      fullscreen
        ? 'fixed inset-0 z-50 m-0 flex items-center justify-center bg-white/40 p-0 backdrop-blur-sm'
        : 'flex min-h-screen items-center justify-center bg-gray-50'
    ]"
  >
    <div class="text-center">
      <div
        class="inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"
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
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
