<script setup lang="ts">
  import { computed } from 'vue'
  import { icons, type IconName } from './icons'

  interface Props {
    name: IconName
    size?: number | string
    color?: string
    stroke?: string
    fill?: string
  }

  const props = defineProps<Props>()

  const normalizedSize = computed(() =>
    typeof props.size === 'number' ? `${props.size}px` : props.size
  )

  const IconComponent = computed(() => icons[props.name])
</script>

<template>
  <component
    :is="IconComponent"
    :width="normalizedSize"
    :height="normalizedSize"
    :stroke="props.stroke || props.color || 'currentColor'"
    :fill="props.fill || 'none'"
    class="svg-icon"
  />
</template>

<style scoped>
  .svg-icon {
    display: inline-block;
    vertical-align: middle;
  }
</style>
