import request from '~/utils/axios'

export function serverInstall(data) {
    return request({
        url: '/server',
        method: "post",
        data: data,
    });
}