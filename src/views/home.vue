<template>
    <el-container class="layout-container h-screen">
      <!-- 顶部 -->
        <el-header class=" bg-gray-400">
          <el-row :gutter="20">
            <el-col :span="6">
              <div class="headtitle">
                <el-icon style="margin-right: 12px; margin-top: 1px"><HomeFilled /></el-icon>
                <span>ServerAdmin</span>
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
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
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
            <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            text-color="#fff"
            >
              <el-menu-item index="1" @click="open('/index')">
                <template #title>
                  <el-icon><House /></el-icon>
                  <span>主页</span>
                </template>
              </el-menu-item>
              <el-menu-item index="2" @click="open('/server')">
                <template #title>
                  <el-icon><setting /></el-icon>
                  <span>服务管理</span>
                </template>
              </el-menu-item>
              <el-sub-menu index="3">
                <template #title>
                  <el-icon><Connection /></el-icon>主机管理
                </template>
                  <el-menu-item index="3-1" @click="open('/hostlist')">主机信息</el-menu-item>
                  <el-menu-item index="3-2" @click="open('/addhost')">添加主机</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="4">
                <template #title>
                  <el-icon><User /></el-icon>用户管理
                </template>
                  <el-menu-item index="4-1" @click="open('/userlist')">用户信息</el-menu-item>
                  <el-menu-item index="4-2" @click="open('/adduser')">添加用户</el-menu-item>
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
import { useStore } from "vuex";
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router'

const router = useRouter()

function open(path) {
  router.push({ path: path })
}

const nickname = sessionStorage.getItem("nickname")
const store = useStore();

const logout = () => {
  store.dispatch("userLogoutAction");
  ElMessage({
      message: "成功登出",
      type: "success",
      duration: 1000,
  });
}

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
  height: 100%;
}
.layout-container .el-aside {
  height: 100%;
  background-color: rgb(84, 92, 100);
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