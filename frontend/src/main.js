import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Import installed modules
import vuetify from './plugins/vuetify'
import ECharts from 'vue-echarts'
import { createPinia } from 'pinia'

const app = createApp(App)

app.component('e-chart', ECharts)
app.use(createPinia())
app.use(vuetify)
app.mount('#app')
