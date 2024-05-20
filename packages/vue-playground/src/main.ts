//import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:uno.css'
import App from './App.vue'
import router from './router'
import {defineCssVars} from "@mahdaad/tokens";
import '@mahdaad/tokens/dist/index.css'

const app = createApp(App)
//app.config.compilerOptions.isCustomElement = (tag) => tag.includes('-')
defineCssVars()
app.use(createPinia())
app.use(router)
app.mount('#app')



/**************************/
/*import MyCustomComponent from './components/web-component/Test3.vue';
// Define the custom element
const app2 = createApp(MyCustomComponent);
const MyCustomElement = app2.mount(document.createElement('div'));
// Register the custom element
customElements.define('my-custom-element', MyCustomElement);*/

//import { defineCustomElement } from 'vue';
//import MyCustomComponent from './components/web-component/Test3.vue';

// Define the custom element
//const CustomElement = defineCustomElement(MyCustomComponent);

// Register the custom element
//window.customElements.define('my-custom-element', CustomElement);
