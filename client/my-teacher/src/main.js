import './assets/css/style.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(vue3GoogleLogin, {
  clientId: '949828583260-eg0umb8ps5h2blcrpc57h4orgen00hq0.apps.googleusercontent.com'
})

app.use(pinia)
app.use(router)

app.mount('#app')
