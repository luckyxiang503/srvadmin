<template>
  <!-- 用户添加弹出窗口 -->
  <el-dialog v-model="dialogFormVisible" title="用户添加">
    <el-form 
      label-width="100px"
      style="max-width: 350px"
      ref="ruleFormRef"
      :rules="rules"
      :model="data.form">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="data.form.username" :disabled="inputVisible"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="data.form.password" type="password" show-password />
      </el-form-item>
      <el-form-item label="是否为管理员" prop="is_admin">
        <el-switch v-model="data.form.is_admin" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="data.form.email" />
      </el-form-item>
    </el-form> 
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
        <el-button @click="resetForm">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <el-scrollbar>
    <el-table :data="filterTableData" height="750px" style="width: 100%, height: 80%;">
      <el-table-column type="index" />
      <el-table-column label="用户名" prop="username" />
      <el-table-column label="是否为管理员" prop="is_admin" />
      <el-table-column label="邮箱" prop="email" />
      <el-table-column align="right">
        <template #header>
          <el-row :gutter="10">
          <el-col :span="20"><el-input v-model="search" size="small" placeholder="根据用户名搜索" /></el-col>
          <el-col :span="4"><el-button size="small" type="primary" @click="dialogFormVisible = true">新增</el-button></el-col>
        </el-row>
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">修改</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, onMounted } from 'vue'
import {getUserlist, deleteUser,addUser,updateUser} from '../api/user'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from "element-plus";

// 变量定义
const dialogFormVisible = ref(false)
const inputVisible = ref(false)
const data = reactive({
    userlist: [],
    form: {
      username: "",
      password: "",
      is_admin: true,
      email: ""
    }
})

// 添加用户
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度为 6 - 20', trigger: 'blur' },
  ],
})

const submitForm = async (ruleForm: FormInstance | undefined) => {
  if (!ruleForm) return
  await ruleForm.validate((valid) => {
    if (!valid) {
      return false
    }
    if (inputVisible.value){
      updateuser()
    } else {
      adduser()
    }
    resetForm()
    requestUserlist()
  })
}

function adduser(){
  addUser(data.form)
  .then(res=>{
    if (res.status==200){
      ElMessage({
        message: "添加成功.",
        type: "success",
        duration: 1000,
      });
    }
  })
}

function updateuser(){
  updateUser(data.form)
  .then(res=>{
    if (res.status==200){
      ElMessage({
        message: "更新成功.",
        type: "success",
        duration: 1000,
      });
    }
  })
}

function resetForm(){
  dialogFormVisible.value = false
  inputVisible.value = false
  data.form = {
    username: "",
    password: "",
    is_admin: true,
    email: ""
  }
}

// 搜索框与展示数据
const search = ref('')
const filterTableData = computed(() =>
  data.userlist.filter(
    (data) =>
      !search.value ||
      data.username.toLowerCase().includes(search.value.toLowerCase())
  )
)

// 修改按钮方法
const handleEdit = (row) => {
  data.form = row
  inputVisible.value = true
  dialogFormVisible.value = true
}

// 删除按钮方法
const handleDelete = (index: number, row) => {
  deleteUser(row.username)
  .then(res=>{
    if (res.status==200){
      delete data.userlist[index]
    }
  })
}

// 挂载生命周期函数
onMounted(()=>{
  requestUserlist()
})

// 请求用户数据
function requestUserlist(){
  getUserlist()
  .then(res=>{
      data.userlist = res.data
  })
  .catch(err=>{
      console.log("主机列表请求失败")
  })
}
</script>
