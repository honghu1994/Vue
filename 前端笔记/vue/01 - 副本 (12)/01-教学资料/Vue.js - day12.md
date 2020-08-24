# Vue.js - day12



## post-man 测试需要token的接口

1. get请求参数写到params
2. post请求参数写到body（测试传文件的接口用form-data，否则用application/x-www-form-urlencoded）
3. 需要token的接口 自己把token 放到headers中携带

## 用户列表

![1565918408501](assets\1565918408501.png)

- [面包屑传送门](https://element.eleme.cn/#/zh-CN/component/breadcrumb)
- [输入框传送门](https://element.eleme.cn/#/zh-CN/component/input)
- [按钮传送门](https://element.eleme.cn/#/zh-CN/component/button)

- [表格传送门](https://element.eleme.cn/#/zh-CN/component/table)

- [分页传送门](https://element.eleme.cn/#/zh-CN/component/pagination)

- 布局步骤：
  - 面包屑设置高度和背景色，line-height
  - 第二行用栅格布局，把输入框和按钮放在同一行，输入框用6格
  - 回到 `index.vue` 给 my-main 这个div设置padding为 0 20px;

## 获取所有用户数据

- 到http.js封装一个用来获取用户的方法
- 方法需要传递三个参数，和带token（写到第二个参数的对象里，分别写params和headers）
- 回到userlist.vue， 导入这个方法，并在created里调用，拿到数据赋值到data并渲染到表格

## 开关的使用

[开关传送门](https://element.eleme.cn/#/zh-CN/component/switch)

- 必须给v-model才能点
- 如果放在表格里要用自定义列模板
- 注：表格里内容默认只是字符串，要放其他按钮都要用自定义列模板
- 后面再用自定义列模板添加最后一列的按钮

- 自定义列模板里：scope.row 代表这一行的数据



## 添加操作一列

- 也要用自定义列
- 自定义列里找三个按钮
- 分别都用plain样式



## 完成搜索功能

- 给文本框加双向绑定，绑定到 searchParams.query 里
- 给文本框加input事件，事件里调用 gerUsers 方法获取用户列表



## axios请求拦截

- 当你用axios发请求时，把它拦截下来

```js
//请求拦截
http.interceptors.request.use(function (config) {

    // 发送请求前调用（发送请求做一些事）
    // 把你所有的请求拦下来
    // 拦下来给你加一个请求头，请求头的内容是token
    config.headers.Authorization = window.localStorage.getItem('token')
    // window.console.log('我调用了', config)
    return config;

}, function (error) {

    //发生错误的回调函数
    return Promise.reject(error);
});
```



## 对话框

[对话框传送门](https://element.eleme.cn/#/zh-CN/component/dialog)

- 复制对话框
- 拿到界面改改改
- `:visible.sync` 绑定一个属性，控制对话框显示或隐藏
- :model 绑定表单数据
- 去找到表单那一栏，复制表单验证的代码
- 给确定加点击事件
  - 点击事件里发请求新增用户