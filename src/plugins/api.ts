import type { App } from 'vue';
import { useApi } from '@/composables/useApi';

// No complex interceptors, no complicated setup
export default {
  install: (app: App) => {
    // Just provide the API instance
    app.provide('api', useApi());
    
    // Optional: add to global properties
    app.config.globalProperties.$api = useApi();
  }
};