<template>
  <Dialog :open="open" @close="emit('close')">

    <!-- Header -->
    <template #header>
      <div>
        <h2 class="text-xl font-bold text-gray-900">Support Ticket</h2>
        <p class="mt-1 text-gray-600">Create a new support request</p>
      </div>
    </template>

    <!-- Body -->
    <div class="space-y-6">
      <div class="space-y-6">
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Name</label>
              <input type="text" class="input-field" placeholder="Your name" v-model="form.name" />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                class="input-field"
                placeholder="Your email"
                v-model="form.email"
              />
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">Issue Type</label>
            <select class="select-field" v-model="form.issueType">
              <option value="">Select issue type</option>
              <option value="technical">Technical Issue</option>
              <option value="billing">Billing Problem</option>
              <option value="account">Account Issue</option>
              <option value="feature">Feature Request</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">Priority</label>
            <div class="flex gap-4">
              <label class="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  v-model="form.priority"
                  class="h-4 w-4 text-blue-600"
                />
                <span class="text-gray-700">Low</span>
              </label>

              <label class="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  v-model="form.priority"
                  class="h-4 w-4 text-blue-600"
                />
                <span class="text-gray-700">Medium</span>
              </label>

              <label class="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  v-model="form.priority"
                  class="h-4 w-4 text-blue-600"
                />
                <span class="text-gray-700">High</span>
              </label>

              <label class="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="priority"
                  value="urgent"
                  v-model="form.priority"
                  class="h-4 w-4 text-blue-600"
                />
                <span class="text-gray-700">Urgent</span>
              </label>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              class="input-field min-h-[120px] resize-none"
              placeholder="Describe your issue in detail..."
              v-model="form.description"
            ></textarea>
          </div>

          <div>
            <label class="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                v-model="form.terms"
                class="h-4 w-4 rounded border-gray-300 text-blue-600"
              />
              <span class="text-gray-700">I agree to the terms and conditions</span>
            </label>
          </div>
        </div>
    </div>

    <!-- Footer -->
    <template #footer>
      <button @click="emit('close')" class="btn btn-secondary">Cancel</button>
      <button
        @click="submitTicket"
        class="btn btn-primary"
        :disabled="!form.terms"
        :class="{ 'cursor-not-allowed opacity-50': !form.terms }"
      >
        Submit Ticket
      </button>
    </template>

  </Dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Dialog from '@/components/ui/Dialog.vue'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits(['close'])

const form = reactive({
  name: '',
  email: '',
  issueType: '',
  priority: 'medium',
  description: '',
  terms: false
})

function submitTicket() {
  if (!form.terms) return
  console.log('Submitting support ticket:', form)
  emit('close')
}
</script>