import {
    createRouter,
    createWebHashHistory
} from 'vue-router'

import Login from '~/pages/login.vue'


const routes = [{
    path:"/",
    component:Login
}]

const router = createRouter[{
    history: createWebHashHistory,
    routes
}]

export default router