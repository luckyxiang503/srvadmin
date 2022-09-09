import { createStore } from "vuex";
import { login, userInfo } from "~/api/user";
import router from '~/router/index'

const store = createStore({
    //  数据 store.state.token
    state: {
        userinfo: {},
    },
    //  要变动数据需要调用 context.commit('increment')
    mutations: {
        changeUserinfo(state, payload) {
            state.userinfo = payload;
        },
        getUserinfo(state) {
            console.log("getUerinfo", state.userinfo)
        }
    },
    actions: {
        //  动作 可通过  store.dispatch('asyncIncrement') 访问该方法
        //  login
        async userLoginAction({ commit }, payload) {
            //    1. 调用登录接口
            const resLogin = await login(payload);
            //    2. 获取到token
            const token = resLogin.data.token;
            //    3. 存储token到sessionStorage,刷新页面不会退出登录
            sessionStorage.setItem("token", token)
                //    4. 请求用户信息接口
            const resUser = await userInfo();
            //    5. userinfo 存到 vuex 和 浏览器缓存中
            commit("changeUserinfo", resUser.data);
            const nickname = resUser.data.username;
            // 存储username到sessionStorage,刷新页面不会退出登录
            sessionStorage.setItem("nickname", nickname)
                //    6. 跳转到首页
            await router.push("/index");
        },

        async userLogoutAction({ commit }) {
            const userinfo = {};
            commit("changeUserinfo", userinfo);
            sessionStorage.clear("token");
            sessionStorage.clear("nickname");
            await router.push('/login');
        }
    },
    // 多个模块之前可以通过这里管理
    modules: {},
});

export default store;