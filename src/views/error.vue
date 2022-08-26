<template>
    <el-result
    icon="warning"
    title="404"
    sub-title="你找的页面不存在！"
    >
    <template #extra>
        <el-button type="primary" @click="$router.push('/')">返回主页</el-button>
    </template>
    </el-result>
</template>
