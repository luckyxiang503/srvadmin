let url = "ws://localhost:8000/api/wslog"

function userWebsocket (handleMessage){
    const ws = new WebSocket(url)

    const init = () => {
        bindEvent();
    }

    function bindEvent(){
        ws.addEventListener('open', handleOpen, false)
        ws.addEventListener('close', handleClose, false)
        ws.addEventListener('error', handleError, false)
        ws.addEventListener('message', handleMessage, false)
    }
    
    function handleOpen(e){
        console.log("websocket open", e)
    }

    function handleClose(e){
        console.log("websocket close", e)
    }

    function handleError(e){
        console.log("websocket error", e)
    }

    init()

    return ws
}






export default {
    userWebsocket,
}