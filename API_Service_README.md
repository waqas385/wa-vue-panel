# **API Usage Guide**

## **Table of Contents**
1. [Installation & Setup](#1-installation--setup)
2. [Basic Usage](#2-basic-usage)
3. [API Methods](#3-api-methods)
4. [Authentication](#4-authentication)
5. [File Upload](#5-file-upload)
6. [Error Handling](#6-error-handling)
7. [Advanced Features](#7-advanced-features)
8. [Component Examples](#8-component-examples)
9. [Troubleshooting](#9-troubleshooting)

---

## **1. Installation & Setup**

### **Step 1: Copy Files**
Place these files in your Vue project:
```
src/
├── types/
│   └── api.ts
├── services/
│   └── ApiService.ts
├── composables/
│   └── useApi.ts
└── plugins/
    └── api.ts
```

### **Step 2: Register Plugin**
In `main.ts`:
```typescript
import { createApp } from 'vue';
import App from './App.vue';
import apiPlugin from '@/plugins/api';

const app = createApp(App);
app.use(apiPlugin);  // Register API plugin
app.mount('#app');
```

### **Step 3: Environment Variables**
Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:3001
```

---

## **2. Basic Usage**

### **Option A: Using Composable (Recommended)**
```vue
<template>
  <div>
    <button @click="fetchData" :disabled="loading">
      {{ loading ? 'Loading...' : 'Get Users' }}
    </button>
    
    <div v-if="error" class="error">
      Error: {{ error.message }}
    </div>
    
    <ul v-if="data">
      <li v-for="user in data" :key="user.id">
        {{ user.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useGet } from '@/composables/useApi';

// Simple GET request with reactive states
const { data, loading, error, execute: fetchData } = useGet('/api/users');

// Auto-fetches on component mount
// Manual refetch: fetchData()
</script>
```

### **Option B: Using API Service Directly**
```vue
<script setup>
import { useApi } from '@/composables/useApi';
import { ref } from 'vue';

const api = useApi();
const users = ref([]);
const loading = ref(false);

const fetchUsers = async () => {
  loading.value = true;
  try {
    const response = await api.get('/api/users');
    users.value = response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
  } finally {
    loading.value = false;
  }
};

// Call the function
fetchUsers();
</script>
```

---

## **3. API Methods**

### **GET Request**
```javascript
// Using composable
const { data, loading, error } = useGet('/api/users', {
  params: { page: 1, limit: 10 }
});

// Using service directly
const response = await api.get('/api/users', {
  params: { search: 'john', active: true }
});
```

### **POST Request**
```javascript
// Create user
const { loading, execute: createUser } = usePost('/api/users');

const handleSubmit = async () => {
  await createUser({
    name: 'John Doe',
    email: 'john@example.com'
  });
};

// With service
const response = await api.post('/api/users', {
  name: 'Jane Doe',
  email: 'jane@example.com'
});
```

### **PUT Request (Update)**
```javascript
// Update user
const { execute: updateUser } = usePut(`/api/users/${userId}`);

const handleUpdate = async () => {
  await updateUser({
    name: 'Updated Name',
    email: 'updated@example.com'
  });
};
```

### **PATCH Request (Partial Update)**
```javascript
const response = await api.patch(`/api/users/${userId}`, {
  email: 'newemail@example.com'
});
```

### **DELETE Request**
```javascript
const { execute: deleteUser } = useDelete(`/api/users/${userId}`);

const handleDelete = async () => {
  if (confirm('Are you sure?')) {
    await deleteUser();
    alert('User deleted!');
  }
};
```

### **Request Options**
All methods accept these options:
```javascript
const options = {
  // Query parameters
  params: {
    page: 1,
    sort: 'name',
    filter: 'active'
  },
  
  // Custom headers
  headers: {
    'X-Custom-Header': 'value',
    'X-Request-ID': '12345'
  },
  
  // Request timeout (ms)
  timeout: 10000,
  
  // Skip auth token (for public endpoints)
  skipAuth: false
};

// Example with options
const response = await api.get('/api/data', options);
```

---

## **4. Authentication**

### **Login/Logout**
```vue
<script setup>
import { useAuth } from '@/composables/useApi';

const auth = useAuth();
const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value);
    // Token is automatically saved and added to future requests
    alert('Login successful!');
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
};

const handleLogout = () => {
  auth.logout();
  alert('Logged out!');
};
</script>
```

### **Manual Token Management**
```javascript
import { useApi } from '@/composables/useApi';

const api = useApi();

// Set token manually (e.g., after login)
api.setToken('your-jwt-token-here');

// Get current token
const token = api.getToken();

// Clear token (logout)
api.clearToken();

// Check if authenticated
const isAuthenticated = api.isAuthenticated();
```

### **Protected Requests**
```javascript
// All requests automatically include the Bearer token
const response = await api.get('/api/profile'); // Token added automatically

// Skip auth for public endpoints
const publicData = await api.get('/api/public-data', {
  skipAuth: true
});
```

---

## **5. File Upload**

### **Single File Upload**
```vue
<template>
  <input type="file" @change="uploadFile" />
  <button @click="uploadFile" :disabled="uploading">
    {{ uploading ? 'Uploading...' : 'Upload' }}
  </button>
</template>

<script setup>
import { useApi } from '@/composables/useApi';
import { ref } from 'vue';

const api = useApi();
const uploading = ref(false);

const uploadFile = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  uploading.value = true;
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', 'My uploaded file');

  try {
    const response = await api.upload('/api/upload', formData);
    console.log('File uploaded:', response.data);
    alert('Upload successful!');
  } catch (error) {
    console.error('Upload failed:', error);
    alert('Upload failed: ' + error.message);
  } finally {
    uploading.value = false;
  }
};
</script>
```

### **Multiple Files Upload**
```javascript
const uploadMultipleFiles = async (files) => {
  const formData = new FormData();
  
  files.forEach((file, index) => {
    formData.append(`files[${index}]`, file);
  });
  
  const response = await api.upload('/api/upload-multiple', formData);
  return response.data;
};
```

---

## **6. Error Handling**

### **Basic Error Handling**
```vue
<template>
  <div v-if="error" class="error-alert">
    <h4>Error {{ error.status }}</h4>
    <p>{{ error.message }}</p>
    
    <!-- Show validation errors -->
    <div v-if="error.errors">
      <ul>
        <li v-for="(messages, field) in error.errors" :key="field">
          <strong>{{ field }}:</strong> {{ messages.join(', ') }}
        </li>
      </ul>
    </div>
    
    <button @click="retry">Try Again</button>
  </div>
</template>

<script setup>
import { useGet } from '@/composables/useApi';

const { data, error, execute: retry } = useGet('/api/data');
</script>

<style scoped>
.error-alert {
  background: #fee;
  border: 1px solid #f99;
  padding: 15px;
  border-radius: 5px;
  margin: 10px 0;
}
</style>
```

### **Global Error Handler**
```javascript
import { useApi } from '@/composables/useApi';

const api = useApi();

// Global error handler
const handleApiError = (error) => {
  console.error('API Error:', error);
  
  // Show user-friendly messages
  switch (error.status) {
    case 401:
      alert('Please login again');
      // Redirect to login
      break;
    case 403:
      alert('You do not have permission');
      break;
    case 404:
      alert('Resource not found');
      break;
    case 500:
      alert('Server error. Please try again later');
      break;
    default:
      alert('An error occurred: ' + error.message);
  }
};

// Usage
try {
  const response = await api.get('/api/data');
} catch (error) {
  handleApiError(error);
}
```

### **Retry on Failure**
```javascript
const response = await api.get('/api/data', {
  retry: 3,           // Retry 3 times on failure
  retryDelay: 1000    // Wait 1 second between retries
});
```

---

## **7. Advanced Features**

### **Global Loading State**
```vue
<template>
  <!-- Global loading indicator -->
  <div v-if="$api.loading" class="global-loader">
    Loading... ({{ $api.requestCount }} requests)
  </div>
  
  <!-- Disable UI while loading -->
  <div :class="{ 'disabled': $api.loading }">
    <!-- Your app content -->
  </div>
</template>

<script setup>
import { useApi } from '@/composables/useApi';

const api = useApi();

// Access global states
console.log('Global loading:', api.loading);
console.log('Active requests:', api.requestCount);
</script>

<style scoped>
.global-loader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
  z-index: 9999;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
```

### **Cancel Requests**
```javascript
// Cancel all active requests
api.abortAllRequests();

// Cancel specific endpoint requests
api.abortByEndpoint('/api/users');
```

### **Custom Headers**
```javascript
// Set headers globally
api.updateDefaultHeaders({
  'X-App-Version': '1.0.0',
  'X-Client': 'web'
});

// Set header for specific request
const response = await api.get('/api/data', {
  headers: {
    'X-Custom-Header': 'value',
    'X-Request-ID': Date.now().toString()
  }
});
```

### **Request Statistics**
```javascript
const stats = api.getStatistics();
console.log('Total requests:', stats.total);
console.log('Successful:', stats.success);
console.log('Failed:', stats.failed);
console.log('Cancelled:', stats.cancelled);

// Reset statistics
api.resetStatistics();
```

---

## **8. Component Examples**

### **Example 1: User Management Component**
```vue
<template>
  <div class="user-management">
    <!-- Create User Form -->
    <form @submit.prevent="createUser" class="mb-4">
      <input v-model="newUser.name" placeholder="Name" required />
      <input v-model="newUser.email" placeholder="Email" required />
      <button type="submit" :disabled="creatingUser">
        {{ creatingUser ? 'Creating...' : 'Add User' }}
      </button>
    </form>
    
    <!-- Users List -->
    <div v-if="loadingUsers">Loading users...</div>
    
    <div v-if="usersError" class="error">
      Failed to load users: {{ usersError.message }}
    </div>
    
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id" class="user-item">
        {{ user.name }} ({{ user.email }})
        <button @click="editUser(user)" :disabled="updatingUser">
          Edit
        </button>
        <button @click="deleteUser(user.id)" :disabled="deletingUser">
          Delete
        </button>
      </li>
    </ul>
    
    <!-- Edit Modal -->
    <div v-if="editingUser" class="modal">
      <h3>Edit User</h3>
      <input v-model="editingUser.name" />
      <input v-model="editingUser.email" />
      <button @click="updateUser">Save</button>
      <button @click="editingUser = null">Cancel</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  useGet, 
  usePost, 
  usePut, 
  useDelete 
} from '@/composables/useApi';

// Get users
const { 
  data: users, 
  loading: loadingUsers, 
  error: usersError,
  execute: loadUsers 
} = useGet('/api/users');

// Create user
const { 
  loading: creatingUser, 
  execute: createUserApi 
} = usePost('/api/users');

// Update user
const { 
  loading: updatingUser, 
  execute: updateUserApi 
} = usePut();

// Delete user
const { 
  loading: deletingUser, 
  execute: deleteUserApi 
} = useDelete();

const newUser = ref({ name: '', email: '' });
const editingUser = ref(null);

const createUser = async () => {
  await createUserApi(newUser.value);
  newUser.value = { name: '', email: '' };
  loadUsers(); // Refresh list
};

const editUser = (user) => {
  editingUser.value = { ...user };
};

const updateUser = async () => {
  if (!editingUser.value) return;
  
  await updateUserApi(`/api/users/${editingUser.value.id}`, editingUser.value);
  editingUser.value = null;
  loadUsers(); // Refresh list
};

const deleteUser = async (userId) => {
  if (!confirm('Delete this user?')) return;
  
  await deleteUserApi(`/api/users/${userId}`);
  loadUsers(); // Refresh list
};
</script>

<style scoped>
.user-management {
  max-width: 600px;
  margin: 0 auto;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.error {
  color: #dc3545;
  padding: 10px;
  background: #f8d7da;
  border-radius: 4px;
  margin: 10px 0;
}
</style>
```

### **Example 2: Search with Debounce**
```vue
<template>
  <div class="search-container">
    <input 
      v-model="searchQuery" 
      @input="debouncedSearch" 
      placeholder="Search users..."
    />
    
    <div v-if="loading">Searching...</div>
    
    <div v-if="error" class="error">
      Search failed: {{ error.message }}
    </div>
    
    <ul v-if="results.length">
      <li v-for="result in results" :key="result.id">
        {{ result.name }}
      </li>
    </ul>
    
    <div v-else-if="searchQuery && !loading">
      No results found
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useGet } from '@/composables/useApi';

const searchQuery = ref('');
const debounceTimer = ref(null);

// Search results
const { 
  data: results, 
  loading, 
  error,
  execute: search 
} = useGet('/api/users/search', {
  params: { q: searchQuery.value }
}, {
  enabled: false // Don't auto-execute
});

// Debounced search function
const debouncedSearch = () => {
  clearTimeout(debounceTimer.value);
  
  if (!searchQuery.value.trim()) {
    results.value = [];
    return;
  }
  
  debounceTimer.value = setTimeout(() => {
    search({ params: { q: searchQuery.value } });
  }, 300); // Wait 300ms after user stops typing
};

// Cleanup timer
import { onUnmounted } from 'vue';
onUnmounted(() => {
  clearTimeout(debounceTimer.value);
});
</script>
```

### **Example 3: Infinite Scroll**
```vue
<template>
  <div class="infinite-scroll" @scroll="handleScroll">
    <div v-for="item in items" :key="item.id" class="item">
      {{ item.name }}
    </div>
    
    <div v-if="loading" class="loading">
      Loading more...
    </div>
    
    <div v-if="error" class="error">
      {{ error.message }}
    </div>
    
    <div v-if="hasMore && !loading" class="load-more">
      <button @click="loadMore">Load More</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useApi } from '@/composables/useApi';

const api = useApi();
const items = ref([]);
const loading = ref(false);
const error = ref(null);
const page = ref(1);
const hasMore = ref(true);

const loadItems = async () => {
  if (loading.value || !hasMore.value) return;
  
  loading.value = true;
  error.value = null;
  
  try {
    const response = await api.get('/api/items', {
      params: { page: page.value, limit: 20 }
    });
    
    items.value = [...items.value, ...response.data.items];
    hasMore.value = response.data.hasMore;
    page.value++;
    
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

const handleScroll = (event) => {
  const element = event.target;
  const threshold = 100; // pixels from bottom
  
  if (element.scrollHeight - element.scrollTop <= element.clientHeight + threshold) {
    loadItems();
  }
};

const loadMore = () => {
  loadItems();
};

// Initial load
onMounted(() => {
  loadItems();
});
</script>

<style scoped>
.infinite-scroll {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 10px;
}

.item {
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.loading {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #dc3545;
  text-align: center;
  padding: 20px;
}

.load-more {
  text-align: center;
  padding: 20px;
}
</style>
```

### **Example 4: Form with Validation**
```vue
<template>
  <form @submit.prevent="submitForm" class="form-container">
    <!-- Name Field -->
    <div class="form-group">
      <label>Name</label>
      <input v-model="formData.name" :class="{ 'error': errors.name }" />
      <div v-if="errors.name" class="error-message">
        {{ errors.name.join(', ') }}
      </div>
    </div>
    
    <!-- Email Field -->
    <div class="form-group">
      <label>Email</label>
      <input v-model="formData.email" type="email" :class="{ 'error': errors.email }" />
      <div v-if="errors.email" class="error-message">
        {{ errors.email.join(', ') }}
      </div>
    </div>
    
    <!-- Password Field -->
    <div class="form-group">
      <label>Password</label>
      <input v-model="formData.password" type="password" :class="{ 'error': errors.password }" />
      <div v-if="errors.password" class="error-message">
        {{ errors.password.join(', ') }}
      </div>
    </div>
    
    <!-- Submit Button -->
    <button type="submit" :disabled="submitting">
      {{ submitting ? 'Submitting...' : 'Submit' }}
    </button>
    
    <!-- Server Response -->
    <div v-if="submitError" class="server-error">
      <strong>Error:</strong> {{ submitError.message }}
    </div>
    
    <div v-if="submitSuccess" class="success-message">
      Form submitted successfully!
    </div>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { usePost } from '@/composables/useApi';

// Form data
const formData = reactive({
  name: '',
  email: '',
  password: ''
});

// Validation errors
const errors = reactive({
  name: [],
  email: [],
  password: []
});

// Form submission
const { 
  loading: submitting, 
  error: submitError,
  execute: submitFormApi 
} = usePost('/api/register');

const submitSuccess = ref(false);

const validateForm = () => {
  // Clear previous errors
  Object.keys(errors).forEach(key => errors[key] = []);
  
  let isValid = true;
  
  // Name validation
  if (!formData.name.trim()) {
    errors.name.push('Name is required');
    isValid = false;
  }
  
  // Email validation
  if (!formData.email) {
    errors.email.push('Email is required');
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email.push('Email is invalid');
    isValid = false;
  }
  
  // Password validation
  if (!formData.password) {
    errors.password.push('Password is required');
    isValid = false;
  } else if (formData.password.length < 6) {
    errors.password.push('Password must be at least 6 characters');
    isValid = false;
  }
  
  return isValid;
};

const submitForm = async () => {
  if (!validateForm()) return;
  
  submitSuccess.value = false;
  
  try {
    await submitFormApi(formData);
    submitSuccess.value = true;
    
    // Reset form
    formData.name = '';
    formData.email = '';
    formData.password = '';
    
  } catch (error) {
    // Handle server validation errors
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        if (errors[key]) {
          errors[key] = error.errors[key];
        }
      });
    }
  }
};
</script>

<style scoped>
.form-container {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group input.error {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 5px;
}

.server-error {
  background: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}

.success-message {
  background: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
}

button {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
```

### **Example 5: Real-time Dashboard**
```vue
<template>
  <div class="dashboard">
    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Users</h3>
        <div class="stat-value">{{ stats.totalUsers }}</div>
        <div v-if="loadingStats" class="stat-loading">...</div>
      </div>
      
      <div class="stat-card">
        <h3>Active Today</h3>
        <div class="stat-value">{{ stats.activeToday }}</div>
      </div>
      
      <div class="stat-card">
        <h3>Revenue</h3>
        <div class="stat-value">${{ stats.revenue }}</div>
      </div>
    </div>
    
    <!-- Recent Activity -->
    <div class="recent-activity">
      <h3>Recent Activity</h3>
      <button @click="refreshActivity" :disabled="refreshing">
        {{ refreshing ? 'Refreshing...' : 'Refresh' }}
      </button>
      
      <ul v-if="activity.length">
        <li v-for="item in activity" :key="item.id">
          <span class="activity-time">{{ formatTime(item.timestamp) }}</span>
          <span class="activity-message">{{ item.message }}</span>
        </li>
      </ul>
      
      <div v-else-if="!loadingActivity">
        No recent activity
      </div>
    </div>
    
    <!-- Global Loading -->
    <div v-if="globalLoading" class="global-loading">
      Loading dashboard data...
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useGet, useApi } from '@/composables/useApi';
import { format } from 'date-fns';

const api = useApi();

// Fetch stats
const { 
  data: statsData, 
  loading: loadingStats,
  execute: loadStats 
} = useGet('/api/dashboard/stats');

// Fetch recent activity
const { 
  data: activityData, 
  loading: loadingActivity,
  execute: loadActivity,
  error: activityError 
} = useGet('/api/dashboard/activity');

const refreshing = ref(false);

// Computed properties
const stats = computed(() => statsData.value || {
  totalUsers: 0,
  activeToday: 0,
  revenue: 0
});

const activity = computed(() => activityData.value || []);

const globalLoading = computed(() => 
  loadingStats.value || loadingActivity.value
);

// Format time helper
const formatTime = (timestamp) => {
  return format(new Date(timestamp), 'HH:mm');
};

// Refresh activity
const refreshActivity = async () => {
  refreshing.value = true;
  try {
    await loadActivity();
  } finally {
    refreshing.value = false;
  }
};

// Auto-refresh every 30 seconds
let refreshInterval;
onMounted(() => {
  refreshInterval = setInterval(() => {
    loadStats();
    loadActivity();
  }, 30000);
});

// Cleanup interval
import { onUnmounted } from 'vue';
onUnmounted(() => {
  clearInterval(refreshInterval);
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-card h3 {
  margin: 0 0 10px 0;
  color: #666;
  font-size: 0.9rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #007bff;
}

.stat-loading {
  font-size: 1.5rem;
  color: #ccc;
}

.recent-activity {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.recent-activity h3 {
  display: inline-block;
  margin-right: 20px;
}

.recent-activity ul {
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
}

.recent-activity li {
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}

.activity-time {
  color: #666;
  font-size: 0.875rem;
  min-width: 60px;
  margin-right: 20px;
}

.activity-message {
  flex: 1;
}

.global-loading {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>
```

---

## **9. Troubleshooting**

### **Common Issues**

1. **CORS Errors**
```javascript
// Make sure your backend allows your frontend origin
// In NestJS main.ts:
app.enableCors({
  origin: 'http://localhost:5173', // Your Vue dev server
  credentials: true
});
```

2. **401 Unauthorized**
```javascript
// Check if token exists
console.log('Token:', api.getToken());

// Set token after login
api.setToken(response.data.token);
```

3. **Network Errors**
```javascript
// Check if backend is running
curl http://localhost:3001/api/health

// Check .env file
console.log('Base URL:', import.meta.env.VITE_API_BASE_URL);
```

4. **Loading States Not Updating**
```vue
<!-- Make sure to use reactive loading state -->
<button :disabled="loading">Submit</button>

<script setup>
const loading = ref(false); // ← Must be reactive

const submit = async () => {
  loading.value = true; // ← Update state
  try {
    await api.post('/submit', data);
  } finally {
    loading.value = false; // ← Reset state
  }
};
</script>
```

### **Debugging Tips**
```javascript
// Add logging to ApiService for debugging
async request(method, endpoint, options) {
  console.log('API Request:', { method, endpoint, options });
  
  try {
    const response = await fetch(url, config);
    console.log('API Response:', response);
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

---

## **Quick Reference**

### **Import Methods**
```javascript
// All in one
import { 
  useApi, 
  useAuth,
  useGet, 
  usePost, 
  usePut, 
  usePatch, 
  useDelete 
} from '@/composables/useApi';

// Or individually
import { useGet } from '@/composables/useApi';
import { usePost } from '@/composables/useApi';
```

### **Response Structure**
```javascript
{
  data: {},      // Response data
  status: 200,   // HTTP status code
  ok: true       // Request success
}
```

### **Error Structure**
```javascript
{
  status: 400,          // HTTP status code
  message: 'Bad Request', // Error message
  errors: {             // Validation errors (if any)
    email: ['Invalid email'],
    password: ['Too short']
  }
}
```

This comprehensive guide covers all aspects of using the API library. Start with the basic examples and gradually explore advanced features as needed!