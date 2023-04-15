import { createApp } from 'vue'
import App from './App.vue'
import "./style.css";
import axios from 'axios'
import router from './router'

const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(router).mount('#app')



