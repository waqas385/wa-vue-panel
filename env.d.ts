/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.svg' {
  const component: any
  export default component
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string,
  readonly VITE_ENVIRONMENT_DEV: Boolean
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}