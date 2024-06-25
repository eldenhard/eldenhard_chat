import { createApp } from 'vue'
import '../src/style/style.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

const app = createApp(App)
const pinia = createPinia()


app
.use(pinia)
.use(PrimeVue, {
    theme: {
        preset: Aura
    }
})
.mount('#app')

