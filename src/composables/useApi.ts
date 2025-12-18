import { ref } from 'vue'
import { SimpleApiService } from '@/services/ApiService'
import type { ApiError } from '@/types/api'

// Global instance
let apiInstance: SimpleApiService | null = null

// Get or create API instance
export function useApi(): SimpleApiService {
  if (!apiInstance) {
    apiInstance = new SimpleApiService()
  }
  return apiInstance
}

// Simple useGet composable
export function useGet<T = any>(endpoint: string, options?: any) {
  const api = useApi()

  // Reactive states
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  // Execute function
  const execute = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await api.get<T>(endpoint, options)
      data.value = response.data
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  // Auto-execute on creation
  execute()

  return {
    data,
    loading,
    error,
    execute
  }
}

// Simple usePost composable
export function usePost<T = any>(endpoint: string, body?: any, options?: any) {
  const api = useApi()

  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<ApiError | null>(null)

  const execute = async (newBody?: any) => {
    loading.value = true
    error.value = null

    try {
      const response = await api.post<T>(endpoint, newBody || body, options)
      data.value = response.data
      return response
    } catch (err: any) {
      error.value = err
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    data,
    loading,
    error,
    execute
  }
}
