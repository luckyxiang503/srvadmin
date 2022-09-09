<template>
  <table class="demo-border">
    <tbody>
      <tr>
        <td class="text">用户：</td>
        <td class="text">{{ data.user.username }}</td>
      </tr>
      <tr>
        <td class="text">是否为管理员：</td>
        <td class="text" v-if=data.user.is_admin>是</td>
        <td class="text" v-else>否</td>
      </tr>
      <tr>
        <td class="text">邮箱：</td>
        <td class="text">{{ data.user.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import {userInfo} from '~/api/user'
import { useStore } from 'vuex'


const store = useStore()

const data = reactive({
  user: {
    username: "",
    is_admin: null,
    email: ""
  }
})

onMounted(()=>{
  data.user = store.state.userinfo
  if (data.user.username){
    // console.log("store userinfo",data.user)
  }
  else
  {
    updateUserinfo()
  }
})

function updateUserinfo() {
  userInfo()
  .then(res=>{
    data.user = res.data
    // console.log("update userinfo",data.user)
    store.commit("changeUserinfo", data.user);
  })
  .catch(err=>{
    console.log("用户信息请求失败")
  })
}
</script>

<style scoped>
.demo-border .text {
  width: 15%;
}
.demo-border .line {
  width: 50%;
}
</style>
