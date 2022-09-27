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
    <el-table :data="data.serverlist" style="width: 100%" max-height="800px">
      <el-table-column label="服务名称" prop="srvname" />
      <el-table-column label="安装模式" prop="mode" />
      <el-table-column label="安装机器" min-width="200px">
        <template #default="scope">
          <el-row v-for="host of scope.row.host">
            <el-col :span="12"><li>{{ host.ip }}</li></el-col>
            <el-col :span="12" v-if="scope.row.srvname == 'mysql' || scope.row.srvname == 'fdfs'">
              <el-select v-model="host.role" placeholder="role" size="small" clearable>
                <el-option v-for="item in servershow.role" :label="item.label" :value="item.value"/>
              </el-select>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 表格按钮 -->
      <el-table-column align="right">
      <template #header>
        <el-button size="small" type="primary" @click="dialogFormVisible = true">添加安装项</el-button>
        <el-button size="small" type="success" @click="submitServerlist">提交</el-button>
      </template>
      <template #default="scope">
        <el-button size="small" type="danger" @click="serverDelete(scope.$index)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script setup>
import { ref,reactive,onMounted,toRaw } from 'vue'
import {getHostlist} from '~/api/host'
import {serversaveinfo} from '~/api/server'
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";

const router = useRouter()

// 添加服务,变量定义
const dialogFormVisible = ref(false)
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
  // 调用服务信息保存接口
  serversaveinfo(data.serverlist)
  .then(res=>{
    if (res.status==200){
      ElMessage({
        message: "服务信息保存成功",
        type: "success",
        duration: 1000,
      })
      router.push('/serverrecord')
    }
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
    {value: "spring", label: "spring初始化"},
    {value: "nginx", label: "nginx"},
    {value: "redis", label: "redis", 
    children: [
        {value: "redis-single", label: "redis 单机"},
        {value: "redis-cluster-one", label: "redis 单机伪集群"},
        {value: "redis-cluster-three", label: "redis 三节点集群"},
        {value: "redis-cluster-six", label: "redis 六节点集群"},
     ]},
    {value: "mysql", label: "mysql", 
    children: [
        {value: "mysql-single", label: "mysql 单机"},
        {value: "mysql-1M1S", label: "mysql 主从"},
    ]},
    {value: "rocketmq", label: "rocketmq", 
    children: [
        {value: "rocketmq-single", label: "rocketmq 单机"},
        {value: "rocketmq-nM", label: "rocketmq 多主"},
    ]},
    {value: "mongodb", label: "mongodb", 
    children: [
        {value: "mongodb-single", label: "mongodb 单机"},
        {value: "mongodb-sharding", label: "mongodb 分片集群"},
    ]},
    {value: "nacos", label: "nacos", 
    children: [
        {value: "nacos-single", label: "nacos 单机"},
        {value: "nacos-cluster", label: "nacos 集群"},
    ]},
    {value: "zookeeper", label: "zookeeper", 
    children: [
        {value: "zookeeper-single", label: "zookeeper 单机"},
        {value: "zookeeper-cluster", label: "zookeeper 集群"},
    ]},
  ],
  role: [
    {value: "master",label: "mysql 主"},
    {value: "slave",label: "mysql 从"},
  ]
}
</script>