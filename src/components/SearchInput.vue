<template>
  <div class="relative">
    <input
      type="text"
      :placeholder="placeholder"
      class="input-field pl-10"
      :class="{
        'cursor-not-allowed bg-gray-100 text-gray-500': disabled
      }"
      :value="modelValue"
      :disabled="disabled"
      @input="handleInput"
    />

    <!-- ✅ Search Icon / Loading Spinner -->
    <div
      class="absolute left-3 top-2 h-5 w-5"
      :class="disabled ? 'text-gray-300' : 'text-gray-400'"
    >
      <SvgIcon v-if="!isTyping || disabled" name="search" size="24" class="h-5 w-5" />
      <SvgIcon v-else name="loader" size="24" class="h-5 w-5 animate-spin" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, nextTick } from 'vue'
  import SvgIcon from '@/components/svgicon/SvgIcon.vue'

  const props = defineProps<{
    modelValue?: string
    placeholder?: string
    disabled?: boolean
  }>()

  const emit = defineEmits(['update:modelValue'])

  /* ✅ Local typing state */
  const isTyping = ref(false)

  /* ✅ Debounce timer */
  let debounceTimer: any = null

  async function handleInput(event: Event) {
    if (props.disabled) return // ✅ Prevent input when disabled

    const value = (event.target as HTMLInputElement).value

    isTyping.value = true
    await nextTick()

    clearTimeout(debounceTimer)

    emit('update:modelValue', value)

    debounceTimer = setTimeout(() => {
      isTyping.value = false
    }, 400)
  }
</script>
