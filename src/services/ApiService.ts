export class SimpleApiService {
  private baseURL: string;
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
  
  // Store auth token
  private token: string | null = null;
  
  // Track loading states
  public loading = false;
  public requestCount = 0;
  
  constructor(baseURL: string = '') {
    this.baseURL = baseURL || import.meta.env.VITE_API_BASE_URL || '';
    
    // Load token from localStorage if available
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('api_token');
    }
  }
  
  // 1. Set auth token (simple!)
  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('api_token', token);
  }
  
  // 2. Clear token
  clearToken(): void {
    this.token = null;
    localStorage.removeItem('api_token');
  }
  
  // 3. Get current token
  getToken(): string | null {
    return this.token;
  }
  
  // 4. Main request method (easy to follow)
  async request<T>(
    method: ApiMethod,
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    
    // Start loading
    this.loading = true;
    this.requestCount++;
    
    try {
      // 1. Build URL
      let url = endpoint.startsWith('http') 
        ? endpoint 
        : `${this.baseURL}${endpoint}`;
      
      // Add query params
      if (options.params) {
        const params = new URLSearchParams();
        Object.entries(options.params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            params.append(key, String(value));
          }
        });
        url += `?${params.toString()}`;
      }
      
      // 2. Prepare headers
      const headers: Record<string, string> = {
        ...this.defaultHeaders,
        ...(options.headers || {})
      };
      
      // Add auth token if exists and not skipped
      if (this.token && !options.skipAuth) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }
      
      // 3. Prepare request config
      const config: RequestInit = {
        method,
        headers
      };
      
      // Add body for POST, PUT, PATCH
      if (['POST', 'PUT', 'PATCH'].includes(method) && options.body) {
        config.body = JSON.stringify(options.body);
      }
      
      // 4. Make the request
      const response = await fetch(url, config);
      
      // 5. Parse response
      let data: any;
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      // 6. Return response
      return {
        data,
        status: response.status,
        ok: response.ok
      };
      
    } catch (error: any) {
      // Handle errors simply
      throw {
        status: 0,
        message: error.message || 'Network error'
      };
      
    } finally {
      // Stop loading
      this.requestCount--;
      if (this.requestCount === 0) {
        this.loading = false;
      }
    }
  }
  
  // Simple convenience methods
  get<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>('GET', endpoint, options);
  }
  
  post<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>('POST', endpoint, { ...options, body });
  }
  
  put<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>('PUT', endpoint, { ...options, body });
  }
  
  patch<T>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>('PATCH', endpoint, { ...options, body });
  }
  
  delete<T>(endpoint: string, options?: RequestOptions) {
    return this.request<T>('DELETE', endpoint, options);
  }
  
  // Simple FormData upload
  upload<T>(endpoint: string, formData: FormData) {
    return this.request<T>('POST', endpoint, {
      body: formData,
      headers: {
        // Don't set Content-Type for FormData - browser does it automatically
      }
    });
  }
}