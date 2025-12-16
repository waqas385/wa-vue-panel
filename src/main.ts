import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import apiPlugin from '@/plugins/api';
import router from './router';

const app = createApp(App);

// Use API plugin
app.use(apiPlugin);
// Use router
app.use(router);

app.mount('#app');
