<template>
    <el-row class="min-h-screen bg-cool-gray-300">
        <el-col :lg="16" class="flex items-center justify-center">
            <div class="font-bold text-4xl text-gray-600 mb-4">服务管理系统</div>
        </el-col>
        <el-col :lg="8" class="bg-light-50 flex items-center justify-center flex-col">
            <h2 class="font-bold text-3xl text-gray-800">用户登录</h2>
            <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
                <span class="h-[1px] w-16 bg-gray-200"></span>
                <span>账号密码登录</span>
                <span class="line"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon><user /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入密码" show-password>
                        <template #prefix>
                            <el-icon><lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button round color="#626aef" class="w-[250px]" type="primary" @click="onSubmit">登 录</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<script setup>
import { reactive,ref } from 'vue'
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

const store = useStore();

const form = reactive({
  username:"admin",
  password:"admin"
})

const rules = {
    username:[
        { 
            required: true, 
            message: '用户名不能为空', 
            trigger: 'blur'
        },
    ],
    password:[
        { 
            required: true, 
            message: '密码不能为空', 
            trigger: 'blur'
        },
    ],
}

const formRef = ref(null)

const onSubmit = () => {
    formRef.value.validate((valid)=>{
        if(!valid){
            return false
        }
        store.dispatch("userLoginAction", form)
        .then(()=>{
            ElMessage({
                message: "成功登录.",
                type: "success",
                duration: 1000,
            });
        })
    })
}
</script>