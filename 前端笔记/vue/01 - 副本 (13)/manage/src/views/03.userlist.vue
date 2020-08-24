<template>
  <div>
    <bread first="用户管理" second="用户列表"></bread>

    <el-row>
      <!-- 第一个格子 -->
      <el-col :span="6">
        <el-input
          @input="getUsers"
          placeholder="请输入内容"
          v-model.trim="searchParams.query"
          class="input-with-select"
        >
          <el-button @click="getUsers" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <!-- 第二个格子 -->
      <el-col :span="18">
        <el-button type="success" plain @click="dialogFormVisible = true">添加用戶</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column property="username" label="姓名" width="120"></el-table-column>
      <el-table-column property="email" label="邮箱"></el-table-column>
      <el-table-column property="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态" width="110">
        <!-- 自定义列 -->
        <template slot-scope="scope">
          <!-- scope.row是这一行绑定的数据 -->
          <!-- {{ scope.row }} -->
          <el-switch
            @change="changeState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <!-- 自定义列 -->
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            size="mini"
            @click="showEdit(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            size="mini"
            @click="delUser(scope.row)"
          ></el-button>

          <el-button
            type="warning"
            icon="el-icon-check"
            plain
            size="mini"
            @click="showRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="searchParams.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="searchParams.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="form.password" autocomplete="off" show-password></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="120px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改用户" :visible.sync="editFormVisible">
      <el-form :model="editForm">
        <el-form-item label="用户名" prop="username" label-width="120px">
          <el-input v-model="editForm.username" autocomplete="off" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱" label-width="120px">
          <el-input v-model="editForm.email" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="电话" label-width="120px">
          <el-input v-model="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doEdit">确 定</el-button>
      </div>
    </el-dialog>



    <el-dialog title="分配角色" :visible.sync="roleFormVisible">
      <el-form :model="roleForm">
        <el-form-item label="当前用户">
          <span>{{roleForm.username}}</span>
        </el-form-item>

        <el-form-item label="请选择角色">
          <el-select v-model="roleForm.rid" placeholder="请选择角色">
            <el-option v-for="item in roles" :label="item.roleName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="userrole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  users,
  addUsers,
  changeUserState,
  editUser,
  deleteUser,
  getRoles,
  changeUserRole
} from "../api/http";

export default {
  name: "users",
  data() {
    return {
      roleForm: {
        // 用户id
        id: 0,
        // 角色id
        rid: 0,
        username: ""
      },
      roles: [],
      roleFormVisible: false,
      currentRow: {},
      // 控制修改显示的属性
      editFormVisible: false,
      // 修改对话框绑定的数据
      editForm: {
        username: "",
        email: "",
        mobile: 0
      },
      // 控制新增对话框显示或隐藏的
      dialogFormVisible: false,
      // 跟表单绑定的对象，绑定表单的数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },

      // 表单验证的规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 11,
            message: "长度在 6 到 11 个字符",
            trigger: "change"
          }
        ]
      },
      // 查询参数对象
      searchParams: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      // 数据总条数
      total: 0,
      // 表格的数据
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },

  methods: {
    userrole() {
      //发请求
      //请求成功就隐藏对话框
      changeUserRole(this.roleForm).then(res => {
        if (res.data.meta.status == 200) {
          this.$message.success("分配成功");
          this.roleFormVisible = false;
          this.getUsers();
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },

    // 显示权限
    showRole(row) {
      // window.console.log(row);

      this.roleForm.username = row.username;

      // 最好不要给文字，而就是给角色的id
      let rid = 0;
      // 根据角色名字查出它对应的角色id
      for (let i = 0; i < this.roles.length; i++) {

        if (this.roles[i].roleName == row.role_name) {
          rid = this.roles[i].id;
          break;
        }

      }
      this.roleForm.rid = rid;
      this.roleForm.id = row.id;

      // 显示出来
      this.roleFormVisible = true;
    },
    delUser(row) {
      this.$confirm("你确定要删除吗？", "是否删除", {
        type: "warning"
      })
        .then(() => {
          deleteUser(row.id).then(res => {
            // console.log(res);
            if (res.data.meta.status == 200) {
              this.$message.success("删除成功");
              this.getUsers();
            } else {
              this.$message.error(res.data.meta.msg);
            }
          });
        })
        .catch(() => {
          this.$message.warning("已取消删除");
        });
    },
    // 点击修改界面的确定触发的方法
    doEdit() {
      editUser(this.editForm).then(res => {
        // console.log(res.data.data); //这个接口也会返回修改后的最新数据，在data.data里

        if (res.data.meta.status == 200) {
          this.$message.success("修改成功");
          this.editFormVisible = false;

          // 把修改后的最新数据赋值到这一行就行了
          this.getUsers(); //重新查询整个页面数据
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },

    showEdit(row) {
      this.currentRow = row;
      //显示出编辑对话框
      this.editFormVisible = true;
      // 这是引用类型，那么意味着editForm和被点击那一行的数据是同一个地址！
      // 所以editForm变了，那一行的数据也跟着变了
      // this.editForm = row;

      // 解决办法：我只是想要它的数据，而不是想跟它同一个地址，所以要新建一个对象
      //this.editForm = {}; //如果你创建一个新对象，双向绑定的地址变了，导致他无法再输入了
      this.editForm.username = row.username;
      this.editForm.mobile = row.mobile;
      this.editForm.email = row.email;
      this.editForm.id = row.id;
    },
    // 修改用户状态
    // 参数：是它修改后的值，参数名可以随便写
    // 如果是开得到true，如果是关得到false
    changeState(row) {
      // window.console.log(row)
      changeUserState(row.id, row.mg_state).then(res => {
        // console.log(res);
        if (res.data.meta.status == 200) {
          this.$message.success("修改状态成功");
        } else {
          this.$message.error(res.data.meta.msg);
        }
      });
    },
    // 新增用户的点击事件
    submitForm(formName) {
      // 对整个表单进行整体验证
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 所有规则都通过
          // 发请求
          addUsers(this.form).then(res => {
            if (res.data.meta.status == 201) {
              // 新增成功
              // 隐藏对话框
              this.dialogFormVisible = false;
              this.getUsers();
            } else {
              //弹出错误信息
              this.$message.error(res.data.meta.msg);
            }
          });
        } else {
          // 验证失败
          return false;
        }
      });
    },

    // 封装的获取用户列表的方法
    getUsers() {
      if (this.searchParams.query != "") this.searchParams.pagenum = 1;

      users(this.searchParams).then(res => {
        // console.log(res);
        this.tableData = res.data.data.users;
        this.total = res.data.data.total;
      });
    },

    // 页码改变事件
    handleCurrentChange(page) {
      // 修改当前页码为你被点击的页码
      this.searchParams.pagenum = page;
      // 发请求获取这一页的数据
      this.getUsers();
    },

    // 页容量改变的事件
    handleSizeChange(size) {
      // 改变页容量
      this.searchParams.pagesize = size;
      // 页容量发生改变，应该数据从第一页重新显示
      this.searchParams.pagenum = 1;
      // 重新获取数据
      this.getUsers();
    }
  },

  created() {
    // 发请求获取用户列表
    this.getUsers();

    // 发请求获取角色列表
    getRoles().then(res => {
      // console.log(res);
      this.roles = res.data.data;
    });
  }
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