<template>
  <div class="my-login">
    <div class="form-box">
      <h2>用户登录</h2>

      <el-form
        label-position="top"
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="my-loginbtn" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "../api/http";

export default {
  data() {
    return {
      ruleForm: { username: "admin", password: "123456" },
      // 表单验证的规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 6 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 13,
            message: "密码在 6 到 13 个字符之间",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {

    submitForm(formName) {
      // validate就是在根据你的规则验证整个表单是否都通过规则
      this.$refs[formName].validate(valid => {
        // 如果通过规则
        if (valid) {
          
          //在这里发请求去看账号密码是否正确
          login( this.ruleForm ).then(res => {

              // 登录成功里
              if(res.data.meta.status == 200){

                //登录成功
                //先提示一下，登录成功
                this.$message.success( {

                  message:'登录成功',
                  duration:1500
                });

                //跳转之前保存返回的token
                window.localStorage.setItem('token',res.data.data.token)

                //跳转到首页
                this.$router.push('/index')

              }else{

                //失败
                this.$message.error(res.data.meta.msg);
              }
          });


        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.my-login {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-box {
    border-radius: 10px;
    padding: 40px;
    padding-bottom: 0;
    width: 550px;
    height: 400px;
    background-color: #fff;

    h2 {
      margin-bottom: 30px;
    }

    .my-loginbtn {
      width: 100%;
    }
  }
}
</style>