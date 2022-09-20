<template>
  <!-- 添加主机弹出窗口 -->
  <el-dialog v-model="dialogFormVisible" title="主机添加">
    <el-form 
    label-width="100px"
    style="max-width: 350px"
    ref="ruleFormRef"
    :rules="rules"
    :model="data.form">
    <el-form-item label="主机" prop="host">
        <el-input v-model="data.form.host" :disabled="inputVisible"/>
    </el-form-item>
    <el-form-item label="端口" prop="port">
        <el-input v-model.number="data.form.port"/>
    </el-form-item>
    <el-form-item label="用户" prop="user">
        <el-input v-model="data.form.user" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="data.form.password" type="password" show-password/>
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
    <el-table :data="filterTableData" height="750px" style="width: 100%">
    <el-table-column type="index" />
    <el-table-column label="ip" prop="host" />
    <el-table-column label="端口" prop="port" />
    <el-table-column label="用户" prop="user" />
    <el-table-column align="right">
      <template #header>
        <el-row :gutter="10">
          <el-col :span="20"><el-input v-model="search" size="small" placeholder="根据ip搜索" /></el-col>
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
import {getHostlist,deleteHost, addHost, updateHost} from '../api/host'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from "element-plus";


// 定义变量
const data = reactive({
    // limit: 0,
    // skip: 15,
    hostlist: [],
    form: {
      host: "",
      port: 22,
      user: "root",
      password: ""
    }
})
// 添加主机相关
const dialogFormVisible = ref(false)
const inputVisible = ref(false)

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  host: [
    { required: true, message: 'ip不能为空', trigger: 'blur' },
  ],
  port: [
    { required: true, message: 'port不能为空', trigger: 'blur' },
    { type: 'number', message: '端口必须为数字' },
  ],
  user: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
  ],
})

const submitForm = async (ruleForm: FormInstance | undefined) => {
  if (!ruleForm) return
  await ruleForm.validate((valid) => {
    if (!valid) {
      return false
    }
    if (inputVisible.value){
      updatehost()
    } else {
      addhost()
    }
    resetForm()
    requestHostlist()
  })
}

function addhost(){
  addHost(data.form)
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

function updatehost(){
  updateHost(data.form)
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
      host: "",
      port: 22,
      user: "root",
      password: ""
  }
}

// 搜索框与数据展示来源
const search = ref('')
const filterTableData = computed(() =>
  data.hostlist.filter((data) =>
      !search.value ||
      data.host.toLowerCase().includes(search.value.toLowerCase())
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
  deleteHost(row.host)
  .then(res=>{
    if (res.status==200){
      data.hostlist.splice(index, 1)
    }
  })
}

onMounted(()=>{
  requestHostlist()
})

// 后端请求数据方法
function requestHostlist(){
  getHostlist()
  .then(res=>{
    data.hostlist = res.data
  })
  .catch(err=>{
      console.log("主机列表请求失败")
  })
}

</script>
