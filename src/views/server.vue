<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <p m="t-0 b-2">State: {{ props.row.state }}</p>
          <p m="t-0 b-2">City: {{ props.row.city }}</p>
          <p m="t-0 b-2">Address: {{ props.row.address }}</p>
          <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
          <h3>Family</h3>
          <el-table :data="props.row.family">
            <el-table-column label="Name" prop="name" />
            <el-table-column label="State" prop="state" />
            <el-table-column label="City" prop="city" />
            <el-table-column label="Address" prop="address" />
            <el-table-column label="Zip" prop="zip" />
          </el-table>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="服务名称" prop="date" />
    <el-table-column label="安装模式" prop="name" />
    <el-table-column align="right">
    <template #header>
      <el-button size="small" type="primary">添加安装项</el-button>
    </template>
    <template #default="scope">
      <el-button size="small">修改</el-button>
      <el-button size="small" type="danger">删除</el-button>
    </template>
  </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'San Francisco',
    address: '3650 21st St, San Francisco',
    zip: 'CA 94114',
    family: [
      {
        name: 'Jerry',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Spike',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
      {
        name: 'Tyke',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
      },
    ],
  },
]
</script>
