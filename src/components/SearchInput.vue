<template>
  <div class="relative">
    <input
      type="text"
      placeholder="Search by name..."
      class="input-field pl-10"
      v-model="searchQuery"
    />
    <SvgIcon
      name="search"
      class="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import SvgIcon from '@/components/svgicon/SvgIcon.vue';

  const searchQuery = ref('')
</script>
