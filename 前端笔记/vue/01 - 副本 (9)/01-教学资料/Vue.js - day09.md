# Vue.js - day09



## 黑买 - 详情页 点击推荐切换详情

### 步骤

1. 给右侧推荐的商品加点击事件
2. 点击里依然跳转详情组件，并带入不同的商品id
3. 根据这个id再去查数据

### 注意点：

1. 我们之前根据id查出数据渲染到界面，写在 `created` 钩子里
2. 这个钩子特点：只有当创建这个组件时才调用一次
3. 导致了创建后，你哪怕再切换别的商品详情，id变了，它也不会调用，因为对于这个组件而言根本没有创建
4. 变得只是URL中的参数，解决：用`watch`侦听参数，参数一旦变化都立刻根据这个id去查数据



## 黑买 - 详情页评论分页获取

![1564019997519](assets\1564019997519.png)

- created和watch里都要发请求去获取评论数据
- 准备一个data里的数据，保存获取到的评论数据
- 找到评论的li，写v-for，并且把每个元素填充进去
- `暂无评论`的p标签要按条件显示（v-if），如果评论数为0，就显示

## 饿了吗UI - 分页

```html
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
</el-pagination>
```

- @size-change：当切换页容量调用的事件，参数是修改后的页容量
- @current-change：当前页发生改变调用，参数是当前页的页码
-  :current-page 设置当前页
-  :page-sizes 设置页容量的可选项
- :page-size：设置每页显示多少条
-  :total : 数据总条数

## 黑买-评论分页功能

步骤：

- 组件里准备三个属性： `pageIndex` 、 `pageSize` 、`total`
- 在获取评论数据里，给 `total`赋值
- 在饿了么UI的标签里，把对应的值赋值为对应的属性
- 在页容量发生改变的事件里：把pageIndex改为1，pageSize改成参数传进来的页容量，调用请求评论的方法
- 在当前页发生改变的事件里：把pageIndex改为参数传进来的页码，再发请求



## axios发post请求

```js
axios
   .post( 网址,对象(传递给服务器的参数) )
   .then(backData=>{})
```



## 黑买 - 登录

### 步骤：

1. 准备登录的组件（复制，直接连body复制，复制过来把body改div）
2. 设置路由规则
3. 给文本框、密码框加双向绑定，给按钮加点击事件
4. 点击事件里发请求(site/account/login)
5. 拿到结果，如果status为0代表登录成功，跳转到用户页（提前准备一个简单用户页），失败弹出错误提示

## 黑买 - 会员中心页面

1. 新建一个 `user.vue` 页面，拷贝模板中的代码到他里面
2. 设置路由规则，/user 跳转到这个页面
3. 这个页面特殊，需要登录才能访问，所以在 `beforeCreate` 钩子里，发请求，判断是否登录，如果没登录，打回登录页

## 坑点 axios 跨域默认不携带cookie

- 此时服务器死活都会返回你没登录
- 原因：axios发请求默认不带cookie
- 解决办法：

```js
// 设置让axios发请求时默认带cookie
axios.defaults.withCredentials = true;
```



## 会话技术 - cookie

- http协议是无状态的（也就是你每次请求，服务器都当你是“初次见面”）
- 服务器记不住你上次做了什么
- 为了解决这个问题： 服务器给你发一个cookie，记住你的特征，你下次来带上cookie，服务器就认识你了



## 全局导航守卫

[传送门](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)

> 作用：可以在跳转到另一个路由之前，帮你做一些处理（比如说判断能不能访问接下来要访问的页面）

### 用法：

1. 语法

```js
router.beforeEach((to, from, next) => {
  // ...
  // to是去哪  from是从哪来  next()放行
})
```

3. 特点：进入路由的任何页面都会被调用，它叫全局导航。在进入组件之前就调用了，
4. 记得要么跳转到另外一个页面去，要么调用next()放行，否则就没任何反应了



## 局部导航守卫

> 在哪个路由规则的组件里写beforeEnter，那么就代表只有进入到这个页面才会被拦截
>
> 用法跟全局的是一毛一样



## 把用户页修改成导航守卫判断是否登录

- 删掉beforeCreate的代码
- 改用导航守卫来做（全局和局部哪种都可以，但是记住全局的必须判断你去的页面是不是user页面）