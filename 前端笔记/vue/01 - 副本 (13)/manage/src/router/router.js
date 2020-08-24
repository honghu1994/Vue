// 导入Vue
import Vue from 'vue'

// 导入路由
import VueRouter from 'vue-router'

// use一下
Vue.use(VueRouter)


// 导入组件
import login from '../views/01.login.vue'
import index from '../views/02.index.vue'


import users from '../views/03.userlist.vue'
import rights from '../views/04.rights.vue'


// 准备规则
const routes = [
    // 登录页
    { path: "/login", component: login },

    // 首页
    {
        path: "/index", component: index,
        // 子路由
        children: [
            { path:'/users', component:users },
            { path:'/rights', component:rights },
        ]   
    },
]

// 创建路由对象
const router = new VueRouter({
    routes
})


router.beforeEach((to, from, next) => {

    // 只有首页
    if (to.path.indexOf('index') != -1) {

        //判断是否有登录，就是判断有没有token,有代表登录，没有代表没登录
        if (window.localStorage.getItem('token')) {

            //有值代表登录，那么就放行
            next();

        } else {

            //没值
            //提示请先登录
            Vue.prototype.$message.error('请先登录！')
            // 打回登录页
            router.push('/login')
        }

    } else {

        // 访问其他页
        next();
    }
})


export default router