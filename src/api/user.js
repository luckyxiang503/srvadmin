import request from '~/utils/axios'


export function login(data) {
    data = `username=${data.username}&password=${data.password}`;
    return request({
        url: "/login",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data,
    });
}

export function userInfo() {
    return request({
        url: "/userinfo",
    });
}

export function getUserlist() {
    return request({
        url: '/alluser',
        method: "get",
    });
}

export function deleteUser(username) {
    return request({
        url: '/user',
        method: "delete",
        params: {
            username: username
        },
    });
}

export function addUser(data) {
    return request({
        url: '/user',
        method: "post",
        data: data,
    });
}

export function updateUser(data) {
    return request({
        url: '/user',
        method: "put",
        data: data,
    });
}