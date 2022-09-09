<template>
  <el-form 
    label-width="100px"
    style="max-width: 350px"
    ref="ruleFormRef"
    :rules="rules"
    :model="form">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username"/>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" show-password />
    </el-form-item>
    <el-form-item label="是否为管理员" prop="is_admin">
      <el-switch v-model="form.is_admin" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">创建</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form> 
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from "element-plus";
import {alterUser} from '~/api/user'

const props = defineProps(['username'])

const ruleFormRef = ref<FormInstance>()

const form = reactive({
  username: "",
  password: "",
  is_admin: true,
  email: ""
})

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
  await ruleForm.validate((valid, fields) => {
    if (!valid) {
      console.log(fields)
      return false
    }
    alterUser(form)
    .then(res=>{
      if (res.status==200){
        ElMessage({
          message: "更新成功.",
          type: "success",
          duration: 1000,
        });
      }
    })   
  })
}

const resetForm = (ruleForm: FormInstance | undefined) => {
  if (!ruleForm) return
  ruleForm.resetFields()
}

const updateUser = () =>{
  
}

</script>
