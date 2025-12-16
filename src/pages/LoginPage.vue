<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50">
        <div class="card p-8 max-w-md w-full">
            <h1 class="text-xl font-bold mb-4 text-center align-bottom">
                <SvgIcon name="lock" size="40" class="text-neutral-600" />
                <div class="mt-2 text-lg">Login</div>
            </h1>

            <!-- Error Message -->
            <div v-if="errorMessage" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
                {{ errorMessage }}
            </div>

            <!-- Loading Indicator -->
            <div v-if="isLoading"
                class="mb-4 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded text-sm text-center">
                Authenticating...
            </div>

            <form @submit.prevent="handleLogin">
                <div class="mb-4">
                    <label class="mb-2 block text-sm font-medium text-gray-700">Email Address</label>
                    <input v-model="email" type="email" class="input-field" placeholder="admin@example.com"
                        :disabled="isLoading" required />
                </div>

                <div class="mb-4">
                    <label class="mb-2 block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="password" type="password" class="input-field" placeholder="Enter your password"
                        :disabled="isLoading" required />
                </div>

                <!-- Remember Me Checkbox -->
                <div class="mb-6 flex items-center">
                    <input type="checkbox" id="rememberMe" v-model="rememberMe"
                        class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        :disabled="isLoading" />
                    <label for="rememberMe" class="ml-2 block text-sm text-gray-700">
                        Remember me
                    </label>
                </div>

                <button class="btn btn-primary w-full mt-4" type="submit" :disabled="isLoading">
                    <span v-if="isLoading">Logging in...</span>
                    <span v-else>Login</span>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import SvgIcon from '@/components/svgicon/SvgIcon.vue'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '@/composables/useApi'
import Loader from '@/components/ui/Loader.vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const router = useRouter()

const api = useApi()
const hasToken = computed(() => {
    return Boolean(localStorage.getItem('admin_token'))
})
const rememberedEmail = computed(() => {
    return localStorage.getItem('remembered_admin_email')
})

const userData = computed(() => {
    try {
        const data = localStorage.getItem('admin_user')
        return data ? JSON.parse(data) : null
    } catch {
        return null
    }
})

// Function to validate token (check expiration)
const validateToken = (): boolean => {
    const token = localStorage.getItem('admin_token')
    if (!token) return false

    try {
        // For JWT tokens, check expiration
        if (token.split('.').length === 3) {
            const payload = JSON.parse(atob(token.split('.')[1]))
            const expirationTime = payload.exp * 1000
            return Date.now() < expirationTime
        }
        return true // Non-JWT tokens assumed valid
    } catch {
        return false
    }
}

// Extract JWT expiration time
const getTokenExpiration = (token: string): number | null => {
    try {
        if (token.split('.').length === 3) {
            const payload = JSON.parse(atob(token.split('.')[1]))
            return payload.exp * 1000 // Convert to milliseconds
        }
        return null
    } catch {
        return null
    }
}

// Check if already logged in on component mount
onMounted(async () => {
    // Check for existing valid token
    const isValidToken = validateToken()

    if (hasToken.value && isValidToken) {
        // User is already logged in with valid token
        console.log('User already logged in, redirecting to dashboard')

        // Set token in API service
        const token = localStorage.getItem('admin_token')
        if (token) {
            api.setToken(token)
        }

        // Redirect to dashboard after short delay
        setTimeout(() => {
            router.push('/dashboard')
        }, 500)
    } else {
        // No valid token, clear any invalid/stale data
        if (hasToken.value && !isValidToken) {
            console.log('Token expired, clearing authentication data')
            clearAuthData()
        }

        // Auto-fill email if "Remember Me" was used before
        if (rememberedEmail.value) {
            email.value = rememberedEmail.value
            rememberMe.value = true
        }
    }
})

// Clear authentication data
const clearAuthData = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    localStorage.removeItem('token_expiry')
    api.clearToken()
}

async function handleLogin() {
    // Reset error message
    errorMessage.value = ''

    // Basic validation
    if (!email.value || !password.value) {
        errorMessage.value = 'Please enter both email and password'
        return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.value)) {
        errorMessage.value = 'Please enter a valid email address'
        return
    }

    isLoading.value = true

    try {
        const response = await api.post('auth/login', {
            email: email.value,
            password: password.value
        }, {
            skipAuth: true // Don't send auth token for login
        })

        if (response.ok && response.data) {
            const { user, token } = response.data

            if (!token) {
                throw new Error('No token received from server')
            }

            if (rememberMe.value) {
                localStorage.setItem('remembered_admin_email', email.value)
            } else {
                localStorage.removeItem('remembered_admin_email')
            }

            api.setToken(token)
            localStorage.setItem('admin_token', token)

            const expiryTime = getTokenExpiration(token)
            if (expiryTime) {
                localStorage.setItem('token_expiry', expiryTime.toString())
                console.log('Token expires at:', new Date(expiryTime).toLocaleString())
            }

            if (user) {
                localStorage.setItem('admin_user', JSON.stringify(user))
                console.log('User data saved:', user.email)
            }

            // Redirect to admin dashboard
            router.push('/dashboard')

        } else {
            // Handle API error response
            errorMessage.value = response.data?.message ||
                response.data?.error ||
                'Login failed. Please check your credentials.'

            // Clear remembered email on failed login
            localStorage.removeItem('remembered_admin_email')
        }

    } catch (error: any) {
        // Handle network or unexpected errors
        console.error('Login error details:', error)

        // Extract error message
        if (error.status === 401) {
            errorMessage.value = 'Invalid email or password'
        } else if (error.status === 404) {
            errorMessage.value = 'Login endpoint not found'
        } else if (error.status === 0) {
            errorMessage.value = 'Network error. Please check your connection.'
        } else if (error.message) {
            errorMessage.value = error.message
        } else if (error.data?.message) {
            errorMessage.value = error.data.message
        } else {
            errorMessage.value = 'Login failed. Please try again.'
        }

        // Clear remembered email on error
        localStorage.removeItem('remembered_admin_email')

    } finally {
        isLoading.value = false
    }
}

</script>