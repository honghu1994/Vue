<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <img src="../assets/img/logo.png" alt />
      <h2>黑店后台管理</h2>
      <a href="#" @click.prevent="logout">退出</a>
    </el-header>
    <el-container>
      <el-aside width="200px" class="my-aside">

        <el-menu class="el-menu-vertical-demo" :unique-opened="true" router>

          <el-submenu v-for="(item,index) in menuList" :index="'' + index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item.authName }}</span>
            </template>

            <el-menu-item v-for="subItem in item.children" :index="subItem.path"><i class="el-icon-menu"></i>
              {{ subItem.authName }}
            </el-menu-item>

          </el-submenu>

        </el-menu>

      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

// 导入获取菜单的方法
import { menus } from '../api/http'


export default {

  name:"index",

  data() {
    return {
      // 菜单数据
      menuList:[]
    }
  },
  methods: {
    logout() {
      //退出本质就是删除token
      this.$confirm("请问是否要退出？", "是否退出", {
        type: "warning"
      })
        .then(() => {
          // 当点击确定触发的
          this.$message({
            type: "success",
            message: "退出成功!"
          });

          // 删掉token
          window.localStorage.removeItem("token");
          // 跳回登录页
          this.$router.push("/login");
        })
        .catch(() => {
          // 当点击取消触发的
          this.$message({
            type: "info",
            message: "乖孩子，你还是舍不得我！"
          });
        });
    }
  },

  created(){

    menus()
      .then(res => {

        this.menuList = res.data.data;
      })
  }
};
</script>

<style lang="less" scoped>
.my-container {
  height: 100%;

  .my-header {
    background-color: #b3c0d1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      color: white;
    }

    a {
      color: orange;
      font-size: 20px;
    }
  }

  .my-aside {
    background-color: #fff;
  }

  .my-main {
    background-color: #e9eef3;
    padding: 0 20px;
  }
}
</style>