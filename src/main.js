import { createApp } from 'vue'
import '../src/style/style.scss'
import App from './App.vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Lara from '@primevue/themes/lara';
import Nora from '@primevue/themes/nora';
import axios from 'axios'

const app = createApp(App)
const pinia = createPinia()


app
.use(pinia)
.use(PrimeVue, {
    theme: {
        preset: Aura
        // 'Aura'
        // 'Lara '
        // 'Nora'
    }
})
.mount('#app')

