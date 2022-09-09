<template>
  <el-table :data="filterTableData" style="width: 100%, height: 80%;">
    <el-table-column type="index" />
    <el-table-column label="ip" prop="host" />
    <el-table-column label="端口" prop="port" />
    <el-table-column label="用户" prop="user" />
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >修改</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import {getHostlist,deleteHost} from '../api/host'

interface Host {
  host: string
  port: Number
  user: string
}

const search = ref('')
const filterTableData = computed(() =>
  data.hostlist.filter(
    (data) =>
      !search.value ||
      data.host.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: Host) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: Host) => {
  deleteHost(row.host)
  .then(res=>{
    if (res.status==200){
      delete data.hostlist[index]
    }
  })
}

const data = reactive({
    limit: 0,
    skip: 10,
    hostlist: []
})

getHostlist(data.limit, data.skip)
.then(res=>{
    data.hostlist = res.data
})
.catch(err=>{
    console.log("主机列表请求失败")
})
</script>
