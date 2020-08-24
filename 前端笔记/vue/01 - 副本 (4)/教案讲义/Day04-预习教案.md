# Vue框架学习 - 第四天



## （1）课程反馈

|      | 感谢各位同学的评论，昨天的课程发散太多，同学们接受度低，先给大家道个歉 |
| ---- | :----------------------------------------------------------- |
| ***  | 老师要是读我的反馈,我当场把电脑给吃了.                       |
| ***  | 老师，您好！~（面无表情的期待脸.webp）                       |
| ***  | 额..... 老师能注意一下课间休息时间么                         |
| ***  | 加油                                                         |
| ***  | 老师能不能把课后给的资料、代码、视频文件夹加个前缀01-xxx 02-xxx 这样好找一点 老师能不能有时候，你说了相信你们都懂了吧，前面的同学就呀呀呀一通回答，然后你就过了，我们这种学渣根本听不到前面的同学回答的什么，我觉得即便您觉得我们懂了，还是稍微一句话带过一下，至少让我们能想起点相关的东西 |
| ***  | ........有史以来最懵逼的一天了                               |
| ***  | 希望老师尽量上午讲完内容,下午留作我们敲代码吸收,不然当天代码真敲不完 |
| ***  | 老师讲课讲得太好了，给贺老师点个赞，每个老师都是希望每个学生都能学得会，学得好！！！谢谢！！！ |
| ***  | 老师讲得很好,声音越大越精神. 就是自己理解能力不是很好.       |
| ***  | promise确实有点绕,我为什么这么菜,不能够理解                  |
| ***  | 都不懂                                                       |
| ***  | 能够使用axios发送post请求--这个好像没用过呢, 老师上课的时候,建议先把主线讲完,扩展的其他知识,然后再细讲,比如那个音乐的案例听起来就很专注,思路也很清晰的. |
| ***  | 能够感受到老师的态度,非常负责,非常的想把知识传递给我们,但是今天还是有点懵 |



##（2）vue单个元素过渡动画

1. vue单个元素过渡动画 使用 transition 标签进行包裹 定义一个name 属性，默认是 v-
2.  name会配合vue执行的过程动态的添加和移除 6个class类名
3. 动画触发的条件是：v-if 或者 v-show 切换显示状态来触发的



##（3）vue分组元素过渡动画

1. 使用 transition-group 标签包裹 name 属性 自定义前缀 tag 定义包裹的外围标签
2. 分组动画的本质其实还是 vue 动态的添加或者删除 class 类名
3. v-for key用来标识当前元素的唯一性 
4. 触发条件是：动态的新增或者删除元素就会触发对应的当前元素的动画



##（4）完善天知道动画分组过渡移除效果

``````js
//设置一个 等待时间 让前面 this.weatherList = [] leave-active 有足够的时间
setTimeout(() => {
	//将获取到的天气信息填充到我们设置的数据中
	this.weatherList = data.data.data.forecast;
	//数据请求成功后 隐藏对应的 loading 加载
	this.wstate.loading = false;
}, 500)
``````



## （5）Vue动画钩子函数基础学习

[动画钩子](https://cn.vuejs.org/v2/guide/transitions.html#JavaScript-钩子)

1. 什么是钩子函数？回调函数就是钩子函数，钩子函数只是vue一个比较高大上叫法而已。
2. 回调函数的本质是：在我们特定时期，调用我们特定的业务逻辑方法
3. setTimeout异步执行的函数其实就是一个回调函数，也就是一个钩子函数
4. vue在过渡动画执行的过程中，也会分好几个阶段来一步一步的完成动画的过程，在这个过程中vue给我们提供了一些回调函数，我们也将这些回调函数称作为动画钩子函数
5. 可以传入 el 这个参数，代表的是当前 操作的dom对象

``````html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"      
  name="fade"
  tag="ul"
>
  <!-- ... -->
</transition>
``````



##（6）修改天知道离开动画过渡效果



## （7）平滑滚动插件 - iScroll 基础使用

[GitHub地址](https://github.com/cubiq/iscroll)  [中文文档传送门](http://caibaojian.com/iscroll-5/)

``````js
// 获取dom
const wrapper = document.querySelector('#wrapper')
// 创建iScroll
const myScroll = new IScroll(wrapper)
// 也可以
//const myScroll = new IScroll('#wrapper')
``````



## （8）平滑滚动插件 - iScroll  内容更新

1. 当盒子内部的元素内容更新以后，内部内容高度发生了变化。
    
2. 需要通过refresh()通知库，内容更新了，重新计算尺寸

    

##（9）在vue中使用iScroll，Vue生命周期钩子 - mounted

  1. 执行的时机：vue把内部的data和页面的内容同步之后就会执行
  2. 挂载到页面上之后,当我们碰到需要获取vue解析的页面内部的dom元素时，基本上都是写在这个钩子函数中
  3. 执行一次
  4. 数据改变之后，updated这个会多次执行




## （10）使用$refs属性操作DOM

[ref属性传送门](https://cn.vuejs.org/v2/api/#ref)  [$refs属性传送门](https://cn.vuejs.org/v2/api/#vm-refs)



##（11）音乐播放器 - 介绍文档结构



##（12）音乐播放器 - 网易云音乐API

[网易云音乐API地址](https://autumnfish.cn)



##（13）音乐播放器 - 获取歌曲列表



##（14）音乐播放器 - 获取歌曲封面和评论



##（15）音乐播放器 - 播放暂停动画



## （16）音乐播放器 - 使用iscroll实现歌曲列表平滑滚动
