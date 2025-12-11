<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <div>
          <h2 class="text-xl font-bold text-gray-900">Support Ticket</h2>
          <p class="text-gray-600 mt-1">Create a new support request</p>
        </div>
        <button 
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Form -->
      <div class="p-6">
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input type="text" class="input-field" placeholder="Your name" v-model="form.name" />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input type="email" class="input-field" placeholder="Your email" v-model="form.email" />
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
            <select
				class="select-field"
				v-model="form.issueType"
			>
              <option value="">Select issue type</option>
              <option value="technical">Technical Issue</option>
              <option value="billing">Billing Problem</option>
              <option value="account">Account Issue</option>
              <option value="feature">Feature Request</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <div class="flex gap-4">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="low" v-model="form.priority" class="w-4 h-4 text-blue-600" />
                <span class="text-gray-700">Low</span>
              </label>
              
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="medium" v-model="form.priority" class="w-4 h-4 text-blue-600" />
                <span class="text-gray-700">Medium</span>
              </label>
              
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="high" v-model="form.priority" class="w-4 h-4 text-blue-600" />
                <span class="text-gray-700">High</span>
              </label>
              
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="priority" value="urgent" v-model="form.priority" class="w-4 h-4 text-blue-600" />
                <span class="text-gray-700">Urgent</span>
              </label>
            </div>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea 
              class="input-field min-h-[120px] resize-none" 
              placeholder="Describe your issue in detail..."
              v-model="form.description"
            ></textarea>
          </div>
          
          <div>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" v-model="form.terms" class="w-4 h-4 text-blue-600 rounded border-gray-300" />
              <span class="text-gray-700">I agree to the terms and conditions</span>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
        <button 
          @click="$emit('close')"
          class="btn btn-secondary"
        >
          Cancel
        </button>
        
        <button 
          @click="submitTicket"
          class="btn btn-primary"
          :disabled="!form.terms"
          :class="{ 'opacity-50 cursor-not-allowed': !form.terms }"
        >
          Submit Ticket
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['close'])

const form = reactive({
  name: '',
  email: '',
  issueType: '',
  priority: 'medium',
  description: '',
  terms: false
})

const submitTicket = () => {
  if (!form.terms) return
  
  console.log('Submitting support ticket:', form)
  alert('Support ticket submitted successfully!')
  emit('close')
}
</script>