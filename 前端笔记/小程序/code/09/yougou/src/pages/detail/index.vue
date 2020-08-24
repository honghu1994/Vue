<template>
  <div>
    <!-- 轮播图 -->
    <swiper class="myswiper" indicator-dots autoplay interval="2000" duration="200" circular>
      <block v-for="(item, index) in detailObj.pics" :key="index">
        <swiper-item>
          <image @click="mypreview(detailObj.pics, item.pics_sma_url)" :src="item.pics_sma_url" class="slide-image" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 信息区域 -->
    <div class="mess">
      <div class="price">
        ￥{{ detailObj.goods_price }}
      </div>
      <div class="word">
        <div class="left">
          {{ detailObj.goods_name }}
        </div>
        <div class="right">
          <span class="iconfont icon-fenxiang"></span>
          <div>分享</div>
          <button open-type="share">分享</button>
        </div>
      </div>
      <div class="send">
        快递：免运费
      </div>
    </div>
    <!-- 促销区域 -->
    <div class="sales">
      <div class="item">
        促销:
        <span class="colorRed">满 300 减 30</span>
      </div>
      <div class="item">
        已选:
        <span class="colorBlack">黑色 / s / 1 件</span>
      </div>
    </div>
    <!-- 图文介绍 -->
    <div class="jieshao">
      <div class="nav">
        <div @click="index = 0" :class="{ active:  index=== 0}" class="name">图文介绍</div>
        <div @click="index = 1" :class="{ active:  index=== 1}" class="name">规格参数</div>
      </div>
      <div class="cont">
        <div class="tuwen" v-if="index === 0" v-html="detailObj.goods_introduce">
        </div>
        <div class="guige" v-if="index === 1">
          规格参数
        </div>
      </div>
    </div>

    <!-- 底部购物车区域 -->
    <div class="bottom">
      <div class="fuke">
        <span class="iconfont icon-kefu1"></span>
        <div>联系客服</div>
        <button open-type="contact">客服</button>
      </div>
      <div @click="toCart" class="cart">
        <span class="iconfont icon-gouwuche"></span>
        <div>购物车</div>
      </div>
      <div @click="addCart" class="addCart">
        加入购物车
      </div>
      <div class="buy">
        立即购买
      </div>
    </div>
  </div>
</template>

<script>
// 导入 myrequest
import myrequest from '../../utils/myrequest.js'

export default {
  data() {
    return {
      index: 0,
      // 商品 id
      id: '',
      detailObj: {},
      // 购物车中的数据集合
      goodsList: {},
      imgList: [
        'https://img.alicdn.com/tfscom/i4/TB1zvvcLXXXXXXxaFXXYXGcGpXX_M2.SS2_180x180xzq90.jpg_.webp',
        'https://img.alicdn.com/tfscom/i1/792536009/TB26i95ahvxQeBjy0FdXXaybXXa_!!792536009.jpg_180x180xzq90.jpg_.webp'
      ]
    }
  },
  methods: {
    // 获取商品数据
    async getDetailObj() {
      let res = await myrequest({
        url: `https://autumnfish.cn/wx/api/public/v1/goods/detail?goods_id=${this.id}`
      })
      // 解构
      let { message, meta } = res.data
      // 判断
      if (meta.status === 200) {
        this.detailObj = message
      }
    },
    // 预览图片
    mypreview(list, current) {
      // console.log(list)
      // console.log(current)
      // 操作数据，生成一个图片的集合
      let urls = []
      // 生成集合
      list.forEach(item => {
        urls.push(item.pics_sma_url)
      })
      // 开启预览对话框
      wx.previewImage({
        current,
        urls
      })
    },
    // 跳转到购物车
    toCart() {
      // 跳转到 tab 页面不能使用 navigateTo 
      // 应用使用 switchTab
      wx.switchTab({
        url: '/pages/cart/main'
      })
    },
    // 将当前商品保存到购物车
    addCart() {
      // // 将商品信息存储到数组中
      // this.goodsList.push(this.detailObj)
      // // 将数据保存到 storage 中
      // wx.setStorageSync('cart', this.goodsList)
      // 加入之前先进行判断：l
      //  是否存在这条数据
      // 添加一个属性状态属性
      this.detailObj.status = true

      if (this.goodsList[this.detailObj.goods_id]) {
        // 如果存在，直接给它的 num 属性加 1
        this.goodsList[this.detailObj.goods_id].num++
      } else {
        // 如果不存在，给对象添加一个属性num,并且将对象添加到 goodsList 中
        this.detailObj.num = 1
        this.goodsList[this.detailObj.goods_id] = this.detailObj;
      }
      // 保存到 storage 中
      wx.setStorageSync('cart', this.goodsList)

      // 提示加入成功
      wx.showToast({
        title: '加入购物车成功',
        icon: 'success',
        duration: 2000
      })
    }
  },
  // 当点击分享按钮时触发的事件
  onShareAppMessage() {
    // 通过返回对象的形式来设置当前分享页面的选项
    return {
      title: '这是我自己写的分享页面',
      imageUrl: 'https://ss0.bdstatic.com/6Ox1bjeh1BF3odCf/it/u=3483325927,946766660&fm=190&app=71&f=PNG?w=121&h=75&s=908FF9B6C2481BEF073DCCE30300E026',
      path: `/pages/detail/main?id=${this.id}`
    }
  },
  mounted() {
    this.id = this.$root.$mp.query.id
    // 得到数据
    this.getDetailObj()
  },
  onShow() {
    // 动态添加数据
    this.goodsList = wx.getStorageSync('cart') || {}
  }
}
</script>

<style lang="less">
// 导入样式
@import '../../utils/css/iconfont.css';
@import './index.less';

.tuwen {
  img {
    display: block;
  }
}
</style>
