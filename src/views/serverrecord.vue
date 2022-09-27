<template>
  <el-scrollbar>
    <el-table
      :data="data.servers"
      style="width: 100%"
      max-height="750px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="服务名" property="srvname" width="100" />
      <el-table-column label="安装模式" property="mode" width="120" />
      <el-table-column label="安装机器">
          <template #default="scope">
              <li v-for="item of scope.row.host">{{ item.ip }} {{ item.role }}</li>
          </template>
      </el-table-column>
      <el-table-column label="创建时间" property="createtime" />
      <el-table-column label="更新时间" property="updatetime" />
      <el-table-column label="状态">
        <template #default="scope">
            <p v-if="scope.row.status === 0">未安装</p>
            <p v-if="scope.row.status === 1">安装中</p>
            <p v-if="scope.row.status === 2">安装成功</p>
            <p v-if="scope.row.status === 3">安装失败</p>
            <p v-else></p>
        </template>
      </el-table-column>
      <!-- 表格按钮 -->
        <el-table-column align="right" width="200px">
        <template #header>
          <el-button size="small" type="success" @click="handleFlush">刷新</el-button>
          <el-button size="small" type="danger" @click="handleDelete">删除记录</el-button>
        </template>
        <template #default="scope">
          <el-button size="small" :disabled="scope.row.status === 1" type="primary" @click="handInstall(scope.row.status, scope.row.id)">安装</el-button>
          <el-button size="small" @click="handleReadLog(scope.row.id,scope.row.logfile)">查看日志</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="div-1">
      <el-button @click="handleReadLog(null,'ServerMsg.txt')">服务安装信息</el-button>
  </div>
  </el-scrollbar>
  <!-- 日志显示区域 -->
  <el-drawer 
  v-model="drawer" 
  :show-close="false"
  size='60%'
  :before-close="drawerclose"
  >
    <template #header>
      <span>安装日志</span>
      <el-button size="small" type="danger" @click="drawerclose">关闭</el-button>
    </template>
    <el-scrollbar ref="scrollbarRef" always @scroll="handleScroll">
      <div>
        <p v-for="msg in msgList" class=" text-amber-400" style="font-size: 14px;">
          >:&nbsp&nbsp<span class=" text-yellow-100">{{ msg }}</span>
        </p>
      </div>
    </el-scrollbar>
  </el-drawer>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue'
import {getServerlist,deleteServer,serverinstall} from '~/api/server'
import { ElMessage,ElMessageBox,ElScrollbar } from "element-plus";
import {userWebsocket} from '~/utils/websocket'

const data = reactive({
    servers: []
})

const multipleSelection = ref([])
const drawer = ref(false)


onMounted(()=>{
  requestServerlist()
})

// 安装按钮方法
async function handInstall(status, id) {
  if (status !== 0) {
    ElMessageBox.confirm(
    '是否重新安装？',
    {
      confirmButtonText: '确认',
      cancelButtonText: '返回',
      type: 'warning',
    }).then(()=>{
      serverinstall(id).then(res=>{
      if (res.status==200) {
          ElMessage({
            message: res.data.msg,
            type: "success",
            duration: 1000,
          })
        }
      })
    })
    .catch(()=>{
      console.log("取消安装")
    })
  } else {
    serverinstall(id).then(res=>{
    if (res.status==200) {
        ElMessage({
          message: res.data.msg,
          type: "success",
          duration: 1000,
        })
      }
    })
  }
}

// websocket 相关
const msgList = ref([])
const scrollbarRef = ref()
const scrolltop = ref(0)
const scrollh = ref(0)

var ws

// 接收信息
async function handleMessage (e) {
  if (e.data){
    await msgList.value.push(e.data)
    // 自动滚动
    scrollbarRef.value.setScrollTop(scrolltop.value + scrollh.value)
  }
  ws.send('Y')
}

// 查看日志按钮方法
async function handleReadLog(id,logfile) {
  drawer.value = true
  ws = await userWebsocket(handleMessage)
  let r = setInterval(function (){
    if (ws.readyState === 1) {
      ws.send(`{"id":${id},"logfile":"${logfile}"}`)
      clearInterval(r)
    }
  }, 500)
  scrollh.value = document.documentElement.clientHeight
}

function handleScroll(e) {
  scrolltop.value = e.scrollTop
}

// 关闭日志页面方法
async function drawerclose() {
  if (ws.readyState === 1) {
    await ws.send("close")
  }
  await ws.close()
  msgList.value = []
  drawer.value = false
  scrolltop.value = 0
}

// 刷新按钮方法
const handleFlush = () => {
  requestServerlist()
}

// 删除记录按钮方法
const handleDelete = () => {
  if (multipleSelection.value.length == 0) {
    return false
  }
  const ids = []
  for (let i=0;i<multipleSelection.value.length;i++) {
    ids.push(multipleSelection.value[i].id)
  }

  deleteServer(ids).then(res=>{
  if (res.status==200){
      ElMessage({
        message: "删除成功",
        type: "success",
        duration: 1000,
      })
      // 删除成功后刷新页面
      requestServerlist()
    } else {
      ElMessage({
        message: "删除失败",
        type: "error",
        duration: 1000,
      })
    }
  })
}

// 后端请求数据方法
function requestServerlist(){
  getServerlist()
  .then(res=>{
    if (res.status==200){
        data.servers = res.data
    }
  })
}

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
</script>


<style>
.div-1 {
  padding: 20px 30px 0px;
  display:flex;
  justify-content: center;
}
.el-drawer {
  background: #606266;
}
.el-drawer__header {
  color: #ffffff;
  font-size: 20px;
  margin-bottom: 0px;
}
.el-drawer__body {
  padding: 10px 0px 0px;
}
.el-drawer .el-scrollbar {
  padding: 5px 10px 5px;
  height: 100%;
  background: #b1b3b8;
}
</style>