<template>
  <el-form 
    label-width="100px"
    style="max-width: 350px"
    ref="ruleFormRef"
    :rules="rules"
    :model="form">
    <el-form-item label="主机" prop="host">
        <el-input v-model="form.host" />
    </el-form-item>
    <el-form-item label="端口" prop="port">
        <el-input v-model.number="form.port"/>
    </el-form-item>
    <el-form-item label="用户" prop="user">
        <el-input v-model="form.user" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">添加</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form> 
</template>

<script lang='ts' setup>
import { reactive,ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from "element-plus";
import {alterHost} from '~/api/host'

const props = defineProps(['host'])

const ruleFormRef = ref<FormInstance>()

const form = reactive({
  host: "",
  port: 22,
  user: "root",
  password: ""
})

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
  await ruleForm.validate((valid, fields) => {
    if (!valid) {
      console.log(fields)
      return false
    }
    alterHost(form)
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



</script>
