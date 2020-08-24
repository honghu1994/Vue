<template>
  <div>
    <bread first="权限管理" second="权限列表"></bread>

    <el-table border :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { rights } from "../api/http";

export default {
  name: "rights",
  data() {
    return {
      tableData: []
    };
  },

  created() {
    rights("list").then(res => {
      //   console.log(res);
      let data = res.data.data;

      for(let i = 0; i < data.length; i++){
        //   switch是全等判断（值要相等类型也要相等）
          switch (data[i].level) {
              case '0':
                  data[i].level = "一级"
                  break;
              case '1':
                  data[i].level = "二级"
                  break;
              case '2':
                  data[i].level = "三级"
                  break;
          
              default:
                  break;
          }
      }

      this.tableData = res.data.data;
    });
  }
};
</script>

