import request from '~/utils/axios'


export function getHostlist() {
    return request({
        url: '/allhost',
        method: "get",
        timeout: 1000,
    });
}

export function deleteHost(host) {
    return request({
        url: '/host',
        method: "delete",
        params: {
            host: host
        },
        timeout: 1000,
    });
}

export function addHost(data) {
    return request({
        url: '/host',
        method: "post",
        data: data,
        timeout: 1000,
    });
}

export function updateHost(data) {
    return request({
        url: '/host',
        method: "put",
        data: data,
        timeout: 1000,
    });
}