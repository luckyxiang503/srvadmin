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
        url: "/user",
    });
  }