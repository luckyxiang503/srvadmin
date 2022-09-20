<template>
  <el-scrollbar>
    <el-table
      :data="data.servers"
      style="width: 100%"
      max-height="800px"
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
          <el-button size="small" type="primary" @click="handleReinstall">重新安装</el-button>
        </template>
        <template #default="scope">
          <el-button size="small">查看日志</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index,scope.row.id)">删除记录</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue'
import {getServerlist,deleteServer,reInstall} from '~/api/server'
import { ElMessage } from "element-plus";

const data = reactive({
    servers: []
})

const multipleSelection = ref([])

onMounted(()=>{
  requestServerlist()
})

// 重新安装按钮方法
const handleReinstall = () => {
  if (multipleSelection.value.length == 0) {
    return false
  }
  const ids = []
  for (let i=0;i<multipleSelection.value.length;i++) {
    ids.push(multipleSelection.value[i].id)
  }
  reInstall(ids).then(res=>{
  if (res.status==200) {
      ElMessage({
        message: "开始安装",
        type: "success",
        duration: 1000,
      })
    }
  })
}

// 刷新按钮方法
const handleFlush = () => {
  requestServerlist()
}

// 删除记录按钮方法
const handleDelete = (index, id) => {
  deleteServer(id).then(res=>{
  if (res.status==200){
      ElMessage({
        message: "删除成功",
        type: "success",
        duration: 1000,
      })
      // 删除成功后刷新页面
      data.servers.splice(index, 1)
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
