import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

// 导入全局基础样式
import "./assets/css/base.less"
// 饿了么UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


// 导入组件
import bread from './components/bread.vue'
Vue.component('bread', bread)


// 导入封装的路由对象
import router from './router/router'


new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')
