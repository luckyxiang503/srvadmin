import service from '~/axios'


export function login(data) {
    data = `username=${data.username}&password=${data.password}`;
    return service({
        url: "/login",
        method: "post",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        data,
    });
}