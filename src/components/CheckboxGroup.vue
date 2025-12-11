<template>
  <div class="card">
    <h3 class="font-medium mb-4">Filters</h3>
    <div class="space-y-3">
      <label class="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" class="w-4 h-4 text-blue-600 rounded border-gray-300" v-model="looksPartners" />
        <span class="text-gray-700">Looks Partners</span>
      </label>
      
      <label class="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" class="w-4 h-4 text-blue-600 rounded border-gray-300" v-model="businessOwner" />
        <span class="text-gray-700">Business Owner</span>
      </label>
      
      <label class="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" class="w-4 h-4 text-blue-600 rounded border-gray-300" v-model="viewOnly" />
        <span class="text-gray-700">View</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const looksPartners = ref(false)
const businessOwner = ref(false)
const viewOnly = ref(false)
</script>