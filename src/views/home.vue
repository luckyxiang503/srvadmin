<template>
    <el-container class="layout-container">
      <!-- 顶部 -->
        <el-header class=" bg-gray-300">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="headtitle">
                <el-icon style="margin-right: 12px; margin-top: 1px"><HomeFilled /></el-icon>
                <router-link to="/">ServerAdmin</router-link>
              </div>
            </el-col>
            <el-col :span="15"></el-col>
            <el-col :span="3">
              <div class="toolbar">
                <el-icon style="margin-right: 8px; margin-top: 1px"><UserFilled /></el-icon>
                <span>{{ nickname }}</span>
                <el-dropdown>
                  <el-icon style="margin-left: 8px; margin-top: 1px"><ArrowDown /></el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>用户信息</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
      <el-container>
        <!-- 左边侧边栏 -->
        <el-aside width="300px">
          <el-scrollbar>
            <el-menu :router="true">
              <el-menu-item index="/index">
                <template #title>
                  <el-icon><House /></el-icon>主页
                </template>
              </el-menu-item>
              <el-menu-item index="/server">
                <template #title>
                  <el-icon><setting /></el-icon>服务管理
                </template>
              </el-menu-item>
              <el-sub-menu>
                <template #title>
                  <el-icon><Connection /></el-icon>主机管理
                </template>
                  <el-menu-item index="/host/list">主机信息</el-menu-item>
                  <el-menu-item>添加主机</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><User /></el-icon>用户管理
                </template>
                  <el-menu-item index="/user/list">用户信息</el-menu-item>
                  <el-menu-item>添加用户</el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <!-- 右边信息显示 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>


<script setup>
import { ref } from 'vue'

const nickname = window.localStorage.getItem("nickname")

</script>

<style scoped>
.layout-container .el-header {
  position: relative;
  height: 80px;
}
.layout-container .el-header .el-row {
  height: 100%;

}
.layout-container .el-menu {
  border-right: none;
}
.layout-container .el-main {
  padding: 0;
}
.layout-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  height: 100%;
  right: 20px;
}
.layout-container .headtitle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  height: 100%;
}

</style>