<template>
  <!-- 添加服务弹出窗口-->
  <el-dialog v-model="dialogFormVisible" title="添加服务">
    <el-form 
      label-width="100px"
      :model="form">
      <el-form-item label="srvname">
        <el-cascader v-model="form.srv" :options="servershow.server" clearable />
      </el-form-item>
      <!-- 主机表格 -->
      <el-form-item label="安装主机">
        <el-select v-model="form.hostindex" multiple placeholder="host">
        <el-option
          v-for="(item, index) in data.hostlist"
          :label="item.host"
          :value="index"
        />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm">添加</el-button>
        <el-button @click="resetForm">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- ------------ 服务表格 ------------- -->
  <el-scrollbar>
    <el-table :data="data.serverlist" :default-expand-all='true' style="width: 100%" height="750px">
      <el-table-column type="expand">
        <template #default="props">
          <div m="4">
            <el-table :data="props.row.host">
              <el-table-column label="主机" prop="ip" />
              <el-table-column label="端口" prop="port" />
              <el-table-column label="用户" prop="user" />
              <el-table-column label="密码" prop="password"/>
              <el-table-column label="role" prop="role">
                <template #default="scope">
                  <span v-show="!tableIsEdit">{{ scope.row.role }}</span>
                  <input v-show="tableIsEdit" type="text" v-model="scope.row.role">
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="服务名称" prop="srvname" />
      <el-table-column label="安装模式" prop="mode" />
      <!-- 表格按钮 -->
      <el-table-column align="right">
      <template #header>
        <el-button size="small" type="primary" @click="dialogFormVisible = true">添加安装项</el-button>
        <el-button size="small" type="success" @click="submitServerlist">提交</el-button>
      </template>
      <template #default="scope">
        <el-button size="small" v-if="!tableIsEdit" @click="tableIsEdit = true">编辑</el-button>
        <el-button size="small" v-if="tableIsEdit" @click="tableIsEdit = false">保存</el-button>
        <el-button size="small" type="danger" @click="serverDelete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script setup>
import { ref,reactive,onMounted,toRaw } from 'vue'
import {getHostlist} from '~/api/host'
import {serverInstall} from '~/api/server'
import { useRouter } from 'vue-router'

const router = useRouter()

// 添加服务,变量定义
const dialogFormVisible = ref(false)
const tableIsEdit = ref(false)
const data = reactive({
  hostlist: [],
  serverlist: [],
})
const form = reactive({
  srv: "",
  hostindex: [],
})

onMounted(()=>{
  requestHostlist()
})

const resetForm = () =>{
  dialogFormVisible.value = false
  form.srv = ""
  form.hostindex = []
}
// 提交按钮方法
const submitServerlist = () => {
  // console.log(data.serverlist)

  // 调用服务安装接口
  serverInstall(data.serverlist)
  .then(res=>{
    console.log("开始安装")
    router.push('/serverlog')
  })
}
// 删除按钮方法
const serverDelete = (index) => {
  data.serverlist.splice(index, 1)
}
// 添加服务按钮方法
const submitForm = () =>{
  const server = reactive({
    srvname: "",
    mode: "",
    host: [],
  })

  server.srvname = form.srv[0]
  if (form.srv.length == 2){
    server.mode = form.srv[1]
  }
  for (let i of form.hostindex){
    const host = reactive({})
    host.ip = data.hostlist[i].host
    host.port = data.hostlist[i].port
    host.user = data.hostlist[i].user
    host.password = data.hostlist[i].password
    host.role = ""
    server.host.push(host)
  }

  // 将值保存在serverlist中
  data.serverlist.push(server)
  // console.log(data.serverlist)
  // 重新将form表单初始化
  dialogFormVisible.value = false
  form.srv = ""
  form.hostindex = []
}

// 后端请求数据方法
function requestHostlist(){
  getHostlist()
  .then(res=>{
    data.hostlist = res.data
  })
}

const servershow = {
    server: [
    {value: "base", label: "base"},
    {value: "jdk", label: "jdk"},
    {value: "app", label: "app"},
    {value: "nginx", label: "nginx"},
    {value: "redis", label: "redis", 
    children: [
        {value: "redis-single", label: "redis-single"},
        {value: "redis-cluster-one", label: "redis-cluster-one"},
        {value: "redis-cluster-three", label: "redis-cluster-three"},
        {value: "redis-cluster-six", label: "redis-cluster-six"},
     ]},
    {value: "mysql", label: "mysql", 
    children: [
        {value: "mysql-single", label: "mysql-single"},
        {value: "mysql-1M1S", label: "mysql-1M1S"},
    ]},
    {value: "rocketmq", label: "rocketmq", 
    children: [
        {value: "rocketmq-single", label: "rocketmq-single"},
        {value: "rocketmq-nM", label: "rocketmq-nM"},
    ]},
    {value: "mongodb", label: "mongodb", 
    children: [
        {value: "mongodb-single", label: "mongodb-single"},
        {value: "mongodb-sharding", label: "mongodb-sharding"},
    ]},
    {value: "nacos", label: "nacos", 
    children: [
        {value: "nacos-single", label: "nacos-single"},
        {value: "nacos-cluster", label: "nacos-cluster"},
    ]},
    {value: "zookeeper", label: "zookeeper", 
    children: [
        {value: "zookeeper-single", label: "zookeeper-single"},
        {value: "zookeeper-cluster", label: "zookeeper-cluster"},
    ]},
  ],
  role: [
    {value: "mysql",label: "mysql",
    children: [
      {value: "master",label: "master",},
      {value: "slave",label: "slave",},
    ]},
  ]
}
</script>