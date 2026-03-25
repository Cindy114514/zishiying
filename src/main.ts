import { createApp } from 'vue'
// @ts-ignore: no declaration file for .vue modules
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
