<template>
  <div class="py-10 text-center text-neutral-500">
    {{ message }}
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    message: string
  }>()
</script>
