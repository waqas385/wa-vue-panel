<template>
  <div class="relative">
    <input
      type="text"
      :placeholder="placeholder"
      class="input-field pl-10"
      :value="modelValue"
      @input="handleInput"
    />

    <!-- ✅ Search Icon / Loading Spinner -->
    <div class="absolute left-3 top-2 h-5 w-5 text-gray-400">
      <SvgIcon v-if="!isTyping" name="search" size="24" class="h-5 w-5 text-gray-400" />
      <SvgIcon v-else name="loader" size="24" class="h-5 w-5 animate-spin text-gray-400" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue'
  import SvgIcon from '@/components/svgicon/SvgIcon.vue'

  const props = defineProps<{
    modelValue: string
    placeholder?: string
  }>()

  const emit = defineEmits(['update:modelValue'])

  /* ✅ Local typing state */
  const isTyping = ref(false)

  /* ✅ Debounce timer */
  let debounceTimer: any = null

  async function handleInput(event: Event) {
    const value = (event.target as HTMLInputElement).value

    // ✅ User started typing → show loader
    isTyping.value = true

    await nextTick()

    // ✅ Reset debounce timer
    clearTimeout(debounceTimer)

    // ✅ Debounce before emitting
    emit('update:modelValue', value)
    debounceTimer = setTimeout(() => {
      // ✅ Stop loader after debounce completes
      isTyping.value = false
    }, 400) // match your API debounce
  }
</script>
