<template>
  <div>
    <!-- 搜索头部 -->
    <tophead />
    <!-- 轮播图 -->
    <div class="lunbo">
      <swiper indicator-dots circular autoplay interval="2000" duration="200">
        <block v-for="(item, index) in imgList" :key="index">
          <swiper-item>
            <image :src="item.image_src" class="slide-image" />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 导航区域 -->
    <div class="nav">
      <div class="item" v-for="(item, index) in cateNavList" :key="index">
        <image :src="item.image_src"></image>
        <div>{{ item.name }}</div>
      </div>
    </div>
    <!-- 楼层区域 -->
    <div class="floor" v-for="(item, index) in floorList" :key="index">
      <div class="title">
        <image :src="item.floor_title.image_src"></image>
        <span>{{item.floor_title.name}}</span>
      </div>
      <div class="content">
        <div class="left">
          <image :src="item.product_list[0].image_src"></image>
        </div>
        <div class="right">
          <block v-for="(subitem, subindex) in item.product_list" :key="subindex">
            <image v-if="subindex !== 0" :src="subitem.image_src"></image>
          </block>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 myrequest.js
import myrequest from '../../utils/myrequest.js'
// 导入头部搜索组件
import tophead from '../../components/tophead'

export default {
  data() {
    return {
      // 轮播图
      imgList: [],
      // 分类导航
      cateNavList: [],
      // 楼层数据
      floorList: []
    }
  },
  methods: {
    // 获取轮播图的数据
    async getLunboList() {
      // 显示加载动画
      wx.showLoading({
        title: '数据加载中...'
      })
      // 在导航栏中显示加载动画
      wx.showNavigationBarLoading()
      let res = await myrequest({
        url: 'https://autumnfish.cn/wx/api/public/v1/home/swiperdata'
      })
      // 解构 
      let { message, meta } = res.data
      // 判断
      if (meta.status === 200) {
        this.imgList = message
      }
      // 隐藏加载动画
      wx.hideLoading()
      // 隐藏导航栏中的加载动画
      wx.hideNavigationBarLoading()
    },
    // 获取分类导航的数据
    async getCateList() {
      // 开启加载动画
      wx.showLoading()
      // 发送到请求得到数据
      var res = await myrequest({
        url: 'https://autumnfish.cn/wx/api/public/v1/home/catitems'
      })
      // 解构
      let { message, meta } = res.data
      // 判断
      if (meta.status === 200) {
        this.cateNavList = message
        console.log(this.cateNavList)
      }
      // 隐藏加载动画
      wx.hideLoading()
    },
    // 获取楼层数据
    async getFloorList() {
      // 开启加载动画
      wx.showLoading()
      // 发送请求
      let res = await myrequest({
        url: 'https://autumnfish.cn/wx/api/public/v1/home/floordata'
      })
      // 解构
      let { message, meta } = res.data
      // 判断
      if (meta.status === 200) {
        this.floorList = message
      }
      // 隐藏加载动画
      wx.hideLoading()
    }
  },
  // 调用
  mounted() {
    // 轮播图
    this.getLunboList()
    // 分类
    this.getCateList()
    // 楼层
    this.getFloorList()
  },
  components: {
    tophead
  }
}
</script>

<style lang="less">
// 轮播图
.lunbo {
  margin-top: 100rpx;
  width: 100%;
  height: 340rpx;
  swiper {
    swiper-item {
      image {
        width: 100%;
        height: 340rpx;
      }
    }
  }
}

// 导航区域
.nav {
  width: 100%;
  height: 192rpx;
  display: flex;
  .item {
    flex: 1;
    text-align: center;
    image {
      width: 100rpx;
      height: 100rpx;
      border-radius: 50%;
    }
    div {
      font-size: 14px;
    }
  }
}

// 楼层区域
.floor {
  .title {
    width: 100%;
    height: 88rpx;
    position: relative;
    image {
      width: 100%;
      height: 88rpx;
    }
    span {
      position: absolute;
      top: 50%;
      left: 30rpx;
      transform: translateY(-50%);
      font-weight: 700;
      color: #666;
      font-size: 14px;
    }
  }
  .content {
    padding: 20rpx 16rpx;
    display: flex;
    height: 386rpx;
    .left {
      width: 230rpx;
      height: 386rpx;
      image {
        width: 230rpx;
        height: 386rpx;
        border-radius: 4px;
      }
    }
    .right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      margin-left: 10rpx;
      image {
        width: 230rpx;
        height: 188rpx;
        border-radius: 4px;
        &:nth-child(2n-1) {
          margin-right: 10rpx;
        }
        &:nth-child(1),
        &:nth-child(2) {
          margin-bottom: 10rpx;
        }
      }
    }
  }
}
</style>
