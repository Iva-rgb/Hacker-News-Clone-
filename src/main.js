import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Comments from "./components/Comments.vue";

createApp(App).component('comments', Comments).use(router).use(VueAxios, axios).mount('#app');