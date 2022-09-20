import request from '~/utils/axios'

export function serverInstall(data) {
    return request({
        url: '/server',
        method: "post",
        data: data,
    });
}

export function getServerlist() {
    return request({
        url: '/serverlist',
        method: "get",
    });
}

export function deleteServer(id) {
    return request({
        url: '/server',
        method: "delete",
        params: {
            id: id
        },
    });
}

export function reInstall(ids) {
    return request({
        url: '/reinstall',
        method: "post",
        data: ids,
    });
}