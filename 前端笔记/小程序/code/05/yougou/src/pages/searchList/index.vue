<template>
  <div>
    <div class="mytop" :style="{position: position}">
      <!-- 搜索区域 -->
      <div class="search">
        <div class="input">
          <icon type="search" size="20"></icon>
          <span>{{ query }}</span>
        </div>
      </div>
      <!-- 顶部导航 -->
      <div class="nav">
        <div @click="changeActive(0)" :class="{ active: selectedIndex===0 }" class="item">综合</div>
        <div @click="changeActive(1)" :class="{ active: selectedIndex===1 }" class="item">销量</div>
        <div @click="changeActive(2)" :class="{ active: selectedIndex===2 }" class="item arrow">价格</div>
      </div>
    </div>
    <!-- 商品区域 -->
    <div class="goods" :style="{marginTop: marginTop}">
      <div class="list" v-for="(item, index) in goodsList" :key="index">
        <div class="img">
          <image :src="item.goods_small_logo"></image>
        </div>
        <div class="mess">
          <div class="word">
            {{ item.goods_name }}
          </div>
          <div class="price">
            ￥
            <span>{{ item.goods_price }}</span>.00
          </div>
        </div>
      </div>
    </div>
    <div class="bottomline" v-if="isEnd">
      -- 我是有底线的 --
    </div>
  </div>
</template>

<script>
// 导入 myrequest
import myrequest from '../../utils/myrequest.js'

export default {
  data() {
    return {
      // 选中的导航
      selectedIndex: 0,
      // 搜索的关键字
      query: '',
      // 商品数据的数据源
      goodsList: [],
      // 当前页
      pagenum: 1,
      // 页容量
      pagesize: 6,
      // 总数
      total: -1,
      // 数据是否加载完
      isEnd: false,
      // 判断是否正在发送请求
      isSend: false,
      // top 区域的定位
      position: 'static',
      // goods 的 margin
      marginTop: '0rpx'
    }
  },
  methods: {
    changeActive(index) {
      this.selectedIndex = index;
    },
    // 动态获取商品列表的数据
    getGoodsList() {
      // 判断：当前浏览器是否正在发送请求
      if (this.isSend === true) {
        // 将 pagenum --
        this.pagenum -= 1;
        wx.showToast({
          title: '有请求正在处理...',
          icon: 'none',
          duration: 1000
        })
        return;
      }

      // 判断：是否需要继续发送请求：
      //   判断当前商品总数据是否与 total 一致，如果一致说明已经加载完成了
      if (this.goodsList.length === this.total) {
        // 使用提示框来提示用户已经加载完成
        wx.showToast({
          title: '数据已经加载完毕',
          icon: 'none',
          duration: 1000
        })
        // 将 isEnd 改为 true
        this.isEnd = true
        return
      }

      wx.showLoading({
        title: '加载中...'
      })
      // 将 isSend 改为 true
      this.isSend = true

      setTimeout(async () => {
        // 请求接口
        let res = await myrequest({
          url: 'https://autumnfish.cn/wx/api/public/v1/goods/search',
          methods: 'GET',
          data: {
            query: this.query,
            pagesize: this.pagesize,
            pagenum: this.pagenum
          }
        })
        // 保存数据
        let { message, meta } = res.data
        // 判断
        if (meta.status === 200) {
          // 给数据源赋值
          // this.goodsList = message.goods
          // 是连接，而不是覆盖
          this.goodsList = [
            ...this.goodsList,
            ...message.goods
          ]
          // 给总条数赋值
          this.total = message.total
        }
        // 将 isSend 重新设置为 false
        this.isSend = false
        wx.hideLoading()
      }, 3000)
    }
  },
  // 页面滚动时触发
  onPageScroll(event) {
    if (event.scrollTop === 0) {
      // 处于顶部时， position： static
      this.position = 'static'
      this.marginTop = '0rpx'
    } else {
      // 向下滚动时， position： fixed
      this.position = 'fixed'
      this.marginTop = '220rpx'
    }
  },
  // 上拉触底事件
  onReachBottom() {
    // 给当前页 + 1
    this.pagenum += 1
    // 重新请求下一页的数据
    this.getGoodsList()
  },
  // 下拉刷新
  onPullDownRefresh() {
    // 将原有的数据全部清除
    this.goodsList = []
    this.pagenum = 1
    this.total = -1
    this.isEnd = false
    this.isSend = false
    // 重新发送请求
    this.getGoodsList()
  },
  // // 使用 onload 来接收参数
  // onLoad(options) {
  //   this.query = options.name
  // }
  // 使用 mounted 来接口参数
  mounted() {
    this.query = this.$root.$mp.query.name
    // 调用获取数据源的方法
    this.getGoodsList()
  }
}
</script>

<style lang="less">
.mytop {
  width: 100%; // position: fixed; // 将来需要通过行内样式设置
  left: 0;
  top: 0;
}

.search {
  width: 100%;
  height: 120rpx;
  padding: 30rpx 16rpx;
  background-color: #eee;
  box-sizing: border-box;
  .input {
    width: 100%;
    height: 60rpx;
    background-color: #fff;
    border-radius: 5rpx;
    display: flex;
    align-items: center;
    icon {
      margin-left: 30rpx;
    }
    span {
      margin-left: 10rpx;
    }
  }
}

.nav {
  width: 100%;
  height: 100rpx;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  display: flex;
  align-items: center;
  .item {
    flex: 1;
    text-align: center;
  }
  .arrow {
    position: relative;
    &:before,
    &:after {
      position: absolute;
      top: -10rpx;
      right: 50rpx;
      content: '';
      width: 0;
      height: 0;
      border-width: 8px;
      border-style: solid;
      border-color: transparent transparent #aaa transparent;
    }
    &:after {
      top: 30rpx;
      border-color: #aaa transparent transparent transparent;
    }
  }
  .active {
    color: #eb4450;
  }
}

.goods {
  width: 100%;
  padding: 0px 20rpx;
  box-sizing: border-box;
  // margin-top: 220rpx; // 将来需要通过行内样式设置
  .list {
    width: 100%;
    height: 260rpx;
    border-bottom: 1px solid #ccc;
    padding: 30rpx 0px;
    box-sizing: border-box;
    display: flex;
    .img {
      image {
        width: 200rpx;
        height: 200rpx;
      }
    }
    .mess {
      margin-left: 25rpx;
      .word {
        font-size: 14px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        -ms-text-overflow: ellipsis;
        text-overflow: ellipsis;
      }
      .price {
        margin-top: 60rpx;
        color: #eb4450;
        span {
          font-size: 20px;
        }
      }
    }
  }
}

.bottomline {
  text-align: center;
  line-height: 100rpx;
  color: #999;
}
</style>
