import request from '~/utils/axios'


export function getHostlist() {
    return request({
        url: '/allhost',
        method: "get",
    });
}

export function deleteHost(host) {
    return request({
        url: '/host',
        method: "delete",
        params: {
            host: host
        },
    });
}

export function addHost(data) {
    return request({
        url: '/host',
        method: "post",
        data: data,
    });
}

export function updateHost(data) {
    return request({
        url: '/host',
        method: "put",
        data: data,
    });
}