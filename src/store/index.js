import App from '../App.vue'
import { createStore } from 'vuex'
import { createApp } from 'vue'

const store = createStore({
    state: {

    },
    mutations: {

    },
    actions: {

    }
})


const app = createApp({ App });
app.use(store)