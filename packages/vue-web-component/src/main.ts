//import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:uno.css'
//import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import router from './router'
//import {defineCssVars} from "@mahdaad/tokens";
//import '@mahdaad/tokens/dist/index.css'
//import MyWebComponent from './components/SampleSimple.ce.vue';// ./components/MyWebComponent.vue
//import { defineCustomElement } from 'vue';

// Convert the Vue component to a web component
///const MyWebComponentElement = defineCustomElement(MyWebComponent);

// Register the web component
///customElements.define('my-web-component', MyWebComponentElement);
const app = createApp(App)
//defineCssVars()
app.use(createPinia())
app.use(router)
app.mount('#app')
