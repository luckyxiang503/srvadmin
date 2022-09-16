<template>
    <el-scrollbar height="700px">
        <div class=" bg-gray-200">
         <p v-for="msg in msgList"># {{ msg }}</p>
        </div>
    </el-scrollbar>
</template>

<script setup>
import {ref,reactive,onBeforeUnmount} from 'vue'
import {userWebsocket} from '~/utils/websocket'


// websocket 相关
const msgList = reactive([])
const receivemsg = ref("Y")
const ws = userWebsocket(handleMessage)

onBeforeUnmount(()=>{
    receivemsg.value = "close"
})

function handleMessage (e) {
  if (e.data){
    msgList.push(e.data)
  }
  ws.send(receivemsg.value)
}
</script>

<style>
p {font-size:15px;}
</style>