//import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:uno.css'
import App from './App.vue'
import router from './router'
import {defineCssVars} from "@mahdaad/tokens";

const app = createApp(App)
defineCssVars()
app.use(createPinia())
app.use(router)
app.mount('#app')
