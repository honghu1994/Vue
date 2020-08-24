

# Vue.js - day14



## 饿了么ui - table展开行 饿了么ui -tag 字体图标

[传送门](https://element.eleme.cn/#/zh-CN/component/table#zhan-kai-xing)

[字体图标传送门](https://element.eleme.cn/#/zh-CN/component/icon)

[tag传送门](https://element.eleme.cn/#/zh-CN/component/tag)

1. 展开行 type='expand'
2. 标签：el-tag 
   1. 属性： closable 代表是否有关闭按钮
   2. type为空代表栏 为success是绿  为warning是黄
3. 字体图标，添加类名

## 后台 - 权限管理 - 角色列表 - 列表数据渲染

1. 调用接口

2. 渲染表格

3. 在折叠行里用栅格布局生成tag

   ![1566180768300](assets\1566180768300.png)



## 后台 - 权限管理 - 删除某个角色的指定权限

- 封装一个发请求的方法，两个参数：roleId（角色的id） 和 rightId（权限的id）
- 给每个标签(el-tag)加close事件，谁被点，就要传入谁的id以及它所属的角色的id
- close事件里，调用发请求的方法，传入这两个参数
- 删除成功刷新
  - 返回值的data.data里就是它剩余的权限，所以只要想办法拿到row，给row的children重新赋值为剩余的权限就变了



## 饿了么ui - tree

[传送门](https://element.eleme.cn/#/zh-CN/component/tree)

```html
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :default-expand-all="true"
      :default-checked-keys="[5,6]"
      :props="defaultProps"
    ></el-tree>
```

- data： 设置树形组件绑定的数据， 它是一个数组，数组中每个元素是一个对象，每个元素里可以有子元素

- show-checkbox： 是否显示多选框

- node-key： 指定把对象里的id作为每个节点的key

- default-expand-all： 是否默认展开所有节点，给true就是展开，给false就是不展开

- default-checked-keys： 设置默认选中的子节点

- props： 告诉树形组件数据关联对象的哪个属性

  - label：关联的文字
  - children：关联的子节点

  

## 后台 - 权限管理 - 角色列表 - 显示权限

- 准备一个对话框，对话框里放tree
- created里面发请求获取所有的树形权限（之前就封装了，只不过传入tree就行了）
- 赋值渲染到界面
- 给表格中`分配权限`加点击事件
- 点击事件里要显示出树的对话框，并且拿到被点击这行的数据里的它拥有的权限的id，再赋值到树形去默认选中

### 补充：$nextTick

- 下一次dom更新后调用
- 其实相当于就是延迟执行（setTimeout），只不过执行时机是下一次DOM更新

## 后台 - 权限管理 - 角色列表 - 分配权限



## 补充

1. 扫码本质是一个网页，手机打开
   1. 浏览器使用定时器去问服务器好了没！
   2. 黑马项目中有
2. 接入各个平台
   1. 支付宝
   2. 微信
   3. 微博
   4. 。。。
   5. 对前端而言就是接口






