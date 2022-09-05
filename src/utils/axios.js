import axios from "axios";
import { ElMessage } from "element-plus";


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
    const token = window.localStorage.getItem("token");
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
    console.log(res.data)
    return res.data.data;
},
(err) => {
    ElMessage({
    message: "请求失败",
    type: "error",
    });
    console.log(err.response.data)
}
);

export default instance