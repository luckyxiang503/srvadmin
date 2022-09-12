import axios from "axios";
import { ElMessage } from "element-plus";
import router from '~/router/index'

//  创建axios 实例
const instance = axios.create({
    // baseURL: "http://localhost:8000",
    baseURL: "/api",
    timeout: 5000,
});

//  拦截器
// 请求
instance.interceptors.request.use(
    (config) => {
        // 获取token 从浏览器缓存
        const token = sessionStorage.getItem("token");
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        console.log(`请求失败. ${error}`);
    }
);

// 响应
instance.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        ElMessage({
            message: err.response.data.detail,
            type: "error",
            duration: 1000,
        });
        if (err.response.status == 401) {
            router.push('/login');
        }
        return false
    }
);

export default instance