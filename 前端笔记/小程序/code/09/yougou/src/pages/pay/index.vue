<template>
  <div>
    <!-- 商品信息 -->
    <div class="list">
      <div class="item" v-for="(value, key) in goodsList" :key="key">
        <div class="info">
          <div class="image">
            <image :src="value.goods_small_logo"></image>
          </div>
          <div class="word">
            <div class="name">
              {{ value.goods_name }}
            </div>
            <div class="price">
              <div class="money">￥
                <span>{{ value.goods_price }}</span>.00</div>
              <div class="num">
                <span>{{ value.num }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 支付按钮 -->
    <button @click="paymoney">微信支付</button>
  </div>
</template>

<script>
// 导入myrequest
import myrequest from '../../utils/myrequest'

export default {
  data() {
    return {
      //已经支付的商品集合
      goodsList: {}
    }
  },
  methods: {
    // 完成微信支付
    async paymoney() {
      let res = await myrequest({
        url: 'https://autumnfish.cn/wx/api/public/v1/my/orders/req_unifiedorder',
        method: 'POST',
        header: {
          Authorization: wx.getStorageSync('token')
        },
        data: {
          order_number: wx.getStorageSync('order')
        }
      })
      let { message, meta } = res.data
      if (meta.status === 200) {
        // 生成支付的二维码
        wx.requestPayment({
          timeStamp: message.wxorder.timeStamp,
          nonceStr: message.wxorder.nonceStr,
          package: message.wxorder.package,
          signType: message.wxorder.signType,
          paySign: message.wxorder.paySign,
          success: res => {
            console.log('支付成功')
            // 删除已经支付过的商品
            this.delpayGoods()
            // 重新跳转到购物车
            wx.navigateBack()
          },
          fail(res) {
            console.log('支付失败')
          }
        })
      }
    },
    // 删除已经支付过的数据
    delpayGoods() {
      let goodsArr = wx.getStorageSync('cart') || {}
      // 删除已经支付过的商品
      Object.keys(this.goodsList).forEach(item => {
        delete goodsArr[item]
      })
      // 将删除后的数组重新保存到 storage 中
      wx.setStorageSync('cart', goodsArr)
    }
  },
  onShow() {
    let goodsArr = wx.getStorageSync('cart') || {}
    // 从数据中取出选中的数据
    Object.keys(goodsArr).forEach(item => {
      if (goodsArr[item].status) {
        this.goodsList[item] = goodsArr[item]
      }
    })
  }
}
</script>

<style lang="less">
.list {
  .item {
    height: 206rpx;
    display: flex;
    .status {
      width: 88rpx;
      height: 206rpx;
      line-height: 206rpx;
      text-align: center;
    }
    .info {
      flex: 1;
      height: 205rpx;
      border-bottom: 1px solid #ddd;
      display: flex;
      justify-content: space-between;
      .image {
        margin-top: 22rpx;
        image {
          width: 160rpx;
          height: 160rpx;
        }
      }
      .word {
        padding: 0 20rpx;
        margin-top: 22rpx;
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .price {
          margin-top: 35rpx;
          display: flex;
          justify-content: space-between;
          .money {
            color: #eb4450;
            span {
              font-size: 18px;
            }
          }
          .num {
            span {
              display: inline-block;
              width: 50rpx;
              height: 40rpx;
              border: 4rpx solid #ccc;
              text-align: center;
              line-height: 40rpx;
              &:nth-child(2) {
                border: none;
              }
            }
          }
        }
      }
    }
  }
}
</style>
