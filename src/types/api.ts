// Simple types - no complex interfaces
export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  ok: boolean;
}

export interface ApiError {
  status: number;
  message: string;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: any;
  timeout?: number;
  skipAuth?: boolean;
}