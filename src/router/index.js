import { createRouter, createWebHistory } from "vue-router";

// 引入
import Home from "~/views/home.vue";
import Login from "~/views/login.vue";
import NotFound from "~/views/error.vue";

// 路由信息
const routes = [
  {
    path: "/",
    name: 'home',
    component: Home,
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
  // if (to.path === "/") return true;
  if (to.path !== "/login") {
    if (!window.localStorage.getItem("token")) {
      return "/login";
    }
  }
});

export default router;
