import { createRouter, createWebHistory } from 'vue-router'
import RenderContainer from '../components/RenderContainer.vue'


const routes = [{
        path: '/',
        name: 'Homepage',
        component: RenderContainer
    },
    {
        path: '/:type',
        name: 'Others',
        component: RenderContainer
    }
]


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router