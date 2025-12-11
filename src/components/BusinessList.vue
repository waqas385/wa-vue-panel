<template>
  <div class="card">
    <div class="flex items-center justify-between mb-6">
      <h3 class="font-medium">Business List</h3>
      <button class="btn btn-primary text-sm">Add New</button>
    </div>
    
    <div class="space-y-4">
      <div 
        v-for="business in businesses" 
        :key="business.id"
        class="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
      >
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <p class="font-medium text-gray-900">{{ business.name }}</p>
            <p class="text-sm text-gray-500">{{ business.owner }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-2">
          <button class="btn btn-secondary text-sm">Edit</button>
          <button class="btn btn-primary text-sm">View</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const businesses = [
  { id: 1, name: 'Beauty Aesthetic', owner: 'John Doe' },
  { id: 2, name: 'Beauty Aesthetic', owner: 'John Doe' },
  { id: 3, name: 'Beauty Aesthetic', owner: 'John Doe' },
  { id: 4, name: 'Beauty Aesthetic', owner: 'John Doe' },
  { id: 5, name: 'Beauty Aesthetic', owner: 'John Doe' },
  { id: 6, name: 'Beauty Aesthetic', owner: 'John Doe' },
  { id: 7, name: 'Beauty Aesthetic', owner: 'John Doe' },
]
</script>