import { createRouter, createWebHistory } from "vue-router";

// 引入
import Home from "~/views/home.vue";
import Login from "~/views/login.vue";
import index from "~/views/index.vue";
import server from "~/views/server.vue"
import userlist from "~/views/userlist.vue"
import hostlist from "~/views/hostlist.vue"
import NotFound from "~/views/error.vue";

// 路由信息
const routes = [{
        path: "/",
        name: 'home',
        component: Home,
        children: [
            { path: '/index', name: index, component: index },
            { path: '/server', name: server, component: server },
            { path: '/userlist', name: userlist, component: userlist },
            { path: '/hostlist', name: hostlist, component: hostlist },
        ]
    },
    {
        path: "/login",
        name: 'login',
        component: Login,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

// 路由器
const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 导航守卫, 没登录跳转登录页
router.beforeEach((to) => {
    if (to.path !== "/login") {
        if (!sessionStorage.getItem("token")) {
            return "/login";
        }
    }
});

export default router;