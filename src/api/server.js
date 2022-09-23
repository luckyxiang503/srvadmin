import request from '~/utils/axios'

export function serversaveinfo(data) {
    return request({
        url: '/srvsaveinfo',
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

export function deleteServer(ids) {
    return request({
        url: '/server',
        method: "delete",
        data: ids,
    });
}

export function serverinstall(id) {
    return request({
        url: '/server',
        method: "post",
        params: {
            srvid: id
        },
    });
}