<template>
  <el-row :gutter="20" class="elrow-top">
    <el-col :span="6" class=" bg-red-400">
    </el-col>
    <el-col :span="12" ossset="6" class=" bg-yellow-400">
    </el-col>
  </el-row>
  <el-row :gutter="20" class="elrow-foot">
    <el-col :span="6" class=" bg-yellow-400">
    </el-col>
    <el-col :span="12" ossset="6" class=" bg-red-400">
    </el-col>
  </el-row>
</template>


<style>
.elrow-top {
    height: 50%;
    /* background-color: rgb(84, 92, 1); */
}

.elrow-foot {
    height: 20%;
    /* background-color: rgb(1, 92, 1); */
}
</style>