import request from '~/utils/axios'


export function getHostlist(skip, limit) {
    return request({
        url: '/hosts',
        method: "get",
        params: {
            skip: skip,
            limit: limit
        },
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

export function alterHost(data) {
    return request({
        url: '/host',
        method: "post",
        data: data,
        timeout: 1000,
    });
}