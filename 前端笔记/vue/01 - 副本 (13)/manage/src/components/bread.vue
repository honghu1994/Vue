<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="my-bread">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{first}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{second}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
//   父组件传递给子组件
  props: ["first", "second"]
};
</script>

<style lang="less" scoped>
.my-bread {
  background-color: #d3dce6;
  height: 45px;
  line-height: 45px;
  padding-left: 15px;
}
</style>