<template>
  <div class="card">
    <h3 class="font-medium mb-4">Partner List</h3>
    <div class="space-y-4">
      <div v-for="partner in partners" :key="partner.id" class="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg">
        <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span class="text-blue-600 font-semibold">{{ partner.initials }}</span>
        </div>
        <div>
          <p class="font-medium text-gray-900">{{ partner.name }}</p>
          <p class="text-sm text-gray-500">{{ partner.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const partners = [
  { id: 1, name: 'Beauty Aesthetic', role: 'John Doe', initials: 'BA' },
  { id: 2, name: 'Beauty Aesthetic', role: 'John Doe', initials: 'BA' },
  { id: 3, name: 'Beauty Aesthetic', role: 'John Doe', initials: 'BA' },
  { id: 4, name: 'Beauty Aesthetic', role: 'John Doe', initials: 'BA' },
]
</script>