<template>
  <el-table :data="filterTableData" style="width: 100%, height: 80%;">
    <el-table-column type="index" />
    <el-table-column label="用户名" prop="username" />
    <el-table-column label="是否为管理员" prop="is_admin" />
    <el-table-column label="邮箱" prop="email" />
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
import {getUserlist, deleteUser} from '../api/user'

interface User {
  username: string
  is_admin: boolean
  email: string
}

const data = reactive({
    limit: 0,
    skip: 10,
    userlist: []
})

const search = ref('')
const filterTableData = computed(() =>
  data.userlist.filter(
    (data) =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase())
  )
)
const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  deleteUser(row.username)
  .then(res=>{
    if (res.status==200){
      delete data.userlist[index]
    }
  })
}

getUserlist(data.limit, data.skip)
.then(res=>{
    data.userlist = res.data
})
.catch(err=>{
    console.log("主机列表请求失败")
})
</script>
