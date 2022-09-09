import request from '~/utils/axios'


export function login(data) {
    data = `username=${data.username}&password=${data.password}`;
    return request({
        url: "/login",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data,
        timeout: 1000,
    });
}

export function userInfo() {
    return request({
        url: "/userinfo",
        timeout: 1000,
    });
}

export function getUserlist(skip, limit) {
    return request({
        url: '/users',
        method: "get",
        params: {
            skip: skip,
            limit: limit
        },
        timeout: 1000,
    });
}

export function deleteUser(username) {
    return request({
        url: '/user',
        method: "delete",
        params: {
            username: username
        },
        timeout: 1000,
    });
}

export function alterUser(data) {
    return request({
        url: '/user',
        method: "post",
        data: data,
        timeout: 1000,
    });
}