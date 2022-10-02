import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import vant from 'vant';
import store from './vuex/index'
// 2. 引入组件样式
import 'vant/lib/index.css';
import './assets/font/iconfont.css'
import './assets/css/index.css'



const app = createApp(App)
app.use(router)
app.use(vant)
app.use(store)

axios.defaults.baseURL = 'http://localhost:3000/'
app.config.globalProperties.$axios = axios
app.mount('#app')