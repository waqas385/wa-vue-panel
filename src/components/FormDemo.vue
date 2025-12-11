<template>
  <div class="space-y-8">
    <!-- Section Toggle -->
    <div class="flex items-center gap-4 mb-6">
      <h2 class="text-lg font-semibold">Form Components Demo</h2>
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Enable All Fields</span>
        <label class="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            v-model="allFieldsEnabled" 
            class="sr-only peer" 
            @change="toggleAllFields"
          />
          <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
        </label>
      </div>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Left Column -->
      <div class="space-y-6">
        <!-- Text Fields -->
        <div class="card">
          <h3 class="font-medium text-gray-700 mb-4">Text Fields</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input 
                type="text" 
                class="input-field" 
                :class="{ 'disabled-field': !allFieldsEnabled }"
                placeholder="Enter your name" 
                v-model="name" 
                :disabled="!allFieldsEnabled"
              />
              <p class="text-xs text-gray-500 mt-1">Disabled when toggle is off</p>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                class="input-field" 
                :class="{ 'disabled-field': !allFieldsEnabled }"
                placeholder="Enter your email" 
                v-model="email" 
                :disabled="!allFieldsEnabled"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input 
                type="password" 
                class="input-field" 
                :class="{ 'disabled-field': !allFieldsEnabled }"
                placeholder="Enter your password" 
                v-model="password" 
                :disabled="!allFieldsEnabled"
              />
            </div>
            
            <!-- Disabled Text Field Example -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span>Disabled Read-only Field</span>
                <span class="badge badge-disabled">Always Disabled</span>
              </label>
              <input 
                type="text" 
                class="input-field disabled-field" 
                value="This field is always disabled" 
                disabled
                readonly
              />
            </div>
          </div>
        </div>
        
        <!-- Radio Buttons -->
        <div class="card">
          <h3 class="font-medium text-gray-700 mb-4">Radio Buttons</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input 
                type="radio" 
                name="plan" 
                value="basic" 
                v-model="selectedPlan" 
                class="radio-field"
                :class="{ 'disabled-radio': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <div>
                <span :class="{ 'text-gray-900': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }">Basic Plan</span>
                <p class="text-sm" :class="{ 'text-gray-500': allFieldsEnabled, 'text-gray-300': !allFieldsEnabled }">$9/month</p>
              </div>
            </label>
            
            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input 
                type="radio" 
                name="plan" 
                value="pro" 
                v-model="selectedPlan" 
                class="radio-field"
                :class="{ 'disabled-radio': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <div>
                <span :class="{ 'text-gray-900': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }">Pro Plan</span>
                <p class="text-sm" :class="{ 'text-gray-500': allFieldsEnabled, 'text-gray-300': !allFieldsEnabled }">$19/month</p>
              </div>
            </label>
            
            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input 
                type="radio" 
                name="plan" 
                value="enterprise" 
                v-model="selectedPlan" 
                class="radio-field"
                :class="{ 'disabled-radio': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <div>
                <span :class="{ 'text-gray-900': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }">Enterprise Plan</span>
                <p class="text-sm" :class="{ 'text-gray-500': allFieldsEnabled, 'text-gray-300': !allFieldsEnabled }">$49/month</p>
              </div>
            </label>
            
            <!-- Disabled Radio Example -->
            <label class="flex items-center gap-3 disabled-label">
              <input 
                type="radio" 
                name="plan" 
                value="disabled" 
                class="radio-field disabled-radio"
                disabled
              />
              <div>
                <span class="text-gray-400">Disabled Plan</span>
                <p class="text-sm text-gray-300">Unavailable</p>
              </div>
            </label>
          </div>
        </div>
      </div>
      
      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Dropdown Select -->
        <div class="card">
          <h3 class="font-medium text-gray-700 mb-4">Dropdown Select</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select 
                class="select-field"
                :class="{ 'disabled-select': !allFieldsEnabled }"
                v-model="selectedCountry"
                :disabled="!allFieldsEnabled"
              >
                <option value="">Select a country</option>
                <option value="us">United States</option>
                <option value="uk">United Kingdom</option>
                <option value="ca">Canada</option>
                <option value="au">Australia</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
              <select 
                class="select-field"
                :class="{ 'disabled-select': !allFieldsEnabled }"
                v-model="selectedBusinessType"
                :disabled="!allFieldsEnabled"
              >
                <option value="">Select business type</option>
                <option value="spa">Spa & Beauty</option>
                <option value="salon">Hair Salon</option>
                <option value="clinic">Medical Clinic</option>
                <option value="wellness">Wellness Center</option>
              </select>
            </div>
            
            <!-- Disabled Select Example -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <span>Disabled Select</span>
                <span class="badge badge-disabled">Read Only</span>
              </label>
              <select 
                class="select-field disabled-select"
                disabled
              >
                <option value="disabled" selected>Always Disabled Selection</option>
              </select>
            </div>
          </div>
        </div>
        
        <!-- Checkbox Group -->
        <div class="card">
          <h3 class="font-medium text-gray-700 mb-4">Notifications</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input 
                type="checkbox" 
                v-model="notifications.email" 
                class="checkbox-field"
                :class="{ 'disabled-checkbox': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <span :class="{ 'text-gray-700': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }">Email notifications</span>
            </label>
            
            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input 
                type="checkbox" 
                v-model="notifications.sms" 
                class="checkbox-field"
                :class="{ 'disabled-checkbox': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <span :class="{ 'text-gray-700': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }">SMS notifications</span>
            </label>
            
            <label class="flex items-center gap-3" :class="{ 'disabled-label': !allFieldsEnabled }">
              <input 
                type="checkbox" 
                v-model="notifications.push" 
                class="checkbox-field"
                :class="{ 'disabled-checkbox': !allFieldsEnabled }"
                :disabled="!allFieldsEnabled"
              />
              <span :class="{ 'text-gray-700': allFieldsEnabled, 'text-gray-400': !allFieldsEnabled }">Push notifications</span>
            </label>
            
            <!-- Disabled Checkbox Example -->
            <label class="flex items-center gap-3 disabled-label">
              <input 
                type="checkbox" 
                class="checkbox-field disabled-checkbox"
                disabled
                checked
              />
              <span class="text-gray-400">Disabled notification (always checked)</span>
            </label>
          </div>
        </div>
        
        <!-- Buttons -->
        <div class="card">
          <h3 class="font-medium text-gray-700 mb-4">Buttons</h3>
          <div class="flex flex-wrap gap-3">
            <button 
              class="btn btn-primary"
              :class="{ 'btn-disabled': !allFieldsEnabled }"
              :disabled="!allFieldsEnabled"
            >
              Primary Button
            </button>
            <button 
              class="btn btn-secondary"
              :class="{ 'btn-disabled': !allFieldsEnabled }"
              :disabled="!allFieldsEnabled"
            >
              Secondary Button
            </button>
            <button class="btn bg-error text-white hover:bg-error-dark">
              Always Enabled
            </button>
            <button class="btn btn-disabled" disabled>
              Always Disabled
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const allFieldsEnabled = ref(true)

const name = ref('')
const email = ref('')
const password = ref('')
const selectedPlan = ref('basic')
const selectedCountry = ref('')
const selectedBusinessType = ref('')

const notifications = reactive({
  email: true,
  sms: false,
  push: true
})

const toggleAllFields = () => {
  // Reset form values when disabling
  if (!allFieldsEnabled.value) {
    name.value = ''
    email.value = ''
    password.value = ''
    selectedCountry.value = ''
    selectedBusinessType.value = ''
    notifications.email = false
    notifications.sms = false
    notifications.push = false
  } else {
    // Restore default values when enabling
    notifications.email = true
    notifications.push = true
    selectedPlan.value = 'basic'
  }
}
</script>

<style scoped>
/* Disabled field styles */
.disabled-field {
  @apply bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed;
}

.disabled-field:focus {
  @apply ring-0 border-gray-200;
}

.disabled-select {
  @apply bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed;
  appearance: none;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239CA3AF' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

.disabled-checkbox {
  @apply bg-gray-100 border-gray-300 text-gray-300 cursor-not-allowed;
}

.disabled-checkbox:checked {
  @apply bg-gray-300 border-gray-300;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}

.disabled-radio {
  @apply bg-gray-100 border-gray-300 cursor-not-allowed;
}

.disabled-radio:checked {
  @apply bg-gray-300 border-gray-300;
}

.disabled-label {
  @apply cursor-not-allowed;
}

/* Disabled button */
.btn-disabled {
  @apply bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed hover:bg-gray-100 hover:text-gray-400;
}

.btn-disabled:focus {
  @apply ring-0;
}

/* Badge for disabled state */
.badge-disabled {
  @apply inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500;
}
</style>