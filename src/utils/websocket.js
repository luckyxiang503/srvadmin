export function userWebsocket(handleMessage) {
    let url = "ws://localhost:8000/api/wslog"

    const ws = new WebSocket(url)

    const init = () => {
        ws.addEventListener('open', handleOpen, false)
        ws.addEventListener('close', handleClose, false)
        ws.addEventListener('error', handleError, false)
        ws.addEventListener('message', handleMessage, false)
    }

    function handleOpen(e) {
        console.log("websocket open")
    }

    function handleClose(e) {
        console.log("websocket close")
    }

    function handleError(e) {
        console.log("websocket error")
    }

    init()
    return ws
}