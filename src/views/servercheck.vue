<template>
  <el-scrollbar>
    <el-table :data="data.checklist" max-height="800px" style="width: 100%">
    <el-table-column type="index" />
    <el-table-column label="host" prop="host" />
    <el-table-column label="状态" prop="status"/>
    <el-table-column label="结果" min-width="200px">
        <template #default="scope">
            <li v-for="s in scope.row.result">{{ s }}</li>
        </template>
    </el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-button size="small" type="primary" @click="HandleChechServer" :disabled="buttonshow">主机服务检查</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import {getHostlist} from '../api/host'
import {servercheck} from '../api/server'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from "element-plus";


// 定义变量
const data = reactive({
    checklist: [],
})
const buttonshow = ref(false)

// 服务检查按钮方法
async function HandleChechServer() {
  buttonshow.value = true
  for (let i in data.checklist) {
      await servercheck(data.checklist[i])
      .then(res=>{
          data.checklist[i] = res.data
      })
  }
  buttonshow.value = false
}

onMounted(()=>{
  requestHostlist()
})

// 后端请求数据方法
function requestHostlist(){
  getHostlist()
  .then(res=>{
    for (let h of res.data) {
        data.checklist.push({
            host: h.host,
            status: "",
            result: null,
        })
    }
  })
  .catch(err=>{
      console.log("获取数据失败")
  })
}

</script>
