<template>
  <div>
    <!-- 个人信息 -->
    <div class="topmess">
      <div v-if="hasAddress" class="mess">
        <div class="user">
          <div class="left">
            收货人： {{ addressObj.userName }}
          </div>
          <div class="right">
            {{ addressObj.telNumber }} >
          </div>
        </div>
        <div class="address">
          收货地址：{{ detailAdrress }}
        </div>
      </div>
      <div v-else @click="getAddress" class="nomess">
        <div class="left">请选择地址</div>
        <div class="right">></div>
      </div>
      <div class="image">
        <image src="/static/imgs/cart_border@2x(1).png"></image>
      </div>
    </div>
    <!-- 购物信息 -->
    <div class="cart">
      <div class="title">
        <span class="iconfont icon-shangdian-copy"></span>
        <span>优购生活馆</span>
      </div>
      <div class="list">
        <div class="item" v-for="(value, key) in goodsList" :key="key">
          <div class="status">
            <icon @click="chenageGoodsStatus(value)" type="success" :color="value.status ? 'red': 'gray'"></icon>
          </div>
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
                  <span @click="sub(value)">-</span>
                  <span>{{ value.num }}</span>
                  <span @click="add(value)">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部结算栏 -->
    <div class="bottom">
      <div class="status">
        <icon @click="checkAll" type="success" :color="selectAll?'red':'gray'"></icon>
      </div>
      <div class="selectAll">全选</div>
      <div class="total">
        <div class="total-money">合计:
          <span>￥{{ totalPrice }}</span>
        </div>
        <div class="send">免运费</div>
      </div>
      <div class="payfor" @click="payfor">
        结算（{{ totalNum }}）
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
      // 标识是否在收货地址
      hasAddress: false,
      // 保存收货地址
      addressObj: {},
      // 动态获取购物车中的数据
      goodsList: {},
      // 用户登录的凭证
      token: ''
    }
  },
  methods: {
    getAddress() {
      // 动态获取收货地址
      wx.chooseAddress({
        success: res => {
          // 给收货地址赋值
          this.addressObj = res
          // 修改标识
          this.hasAddress = true
          // 将收货地址的信息存储到 storage 中
          wx.setStorageSync('address', this.addressObj)
        }
      })
    },
    // 数量++
    add(obj) {
      obj.num++;
      // 同步到 storage 中
      wx.setStorageSync('cart', this.goodsList)
    },
    // 数量 --
    sub(obj) {
      obj.num--;
      // 判断：当前商品数量是否小于等于 0
      if (obj.num <= 0) {
        // 询问是否删除
        wx.showModal({
          title: '提示',
          content: '确定删除吗',
          success: res => {
            if (res.confirm) {
              // 将当前商品从 goodsList 中删除
              delete this.goodsList[obj.goods_id]
            } else {
              obj.num++
            }
            // 注意点：删除对象中的属性，页面没有动态更新
            // 更新：重新获取一次数据
            this.goodsList = { ...this.goodsList };
            // 同步到 storage 中
            wx.setStorageSync('cart', this.goodsList)
          }
        })
      }
    },
    // 全选
    checkAll() {
      // 得到全选状态
      let isCheckAll = !this.selectAll
      // 根据状态设置所有商品的状态
      for (var key in this.goodsList) {
        this.goodsList[key].status = isCheckAll
      }
      // 将信息重新保存到 storage 中
      wx.setStorageSync('cart', this.goodsList)
    },
    // 修改单个商品的状态
    chenageGoodsStatus(value) {
      value.status = !value.status
      // 同步到 storage　中
      wx.setStorageSync('cart', this.goodsList)
    },
    // 结算购物车：
    //  1.0 登录验证 2.0 生成订单号
    async payfor() {
      // 判断 token 中是否有内容
      if (this.token === '') {
        // 没有 token，跳转到登录页面
        // 提示
        wx.showToast({
          title: '您还没有登录',
          icon: 'none',
          duration: 1000
        })
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/login/main'
          })
        }, 1000)
        // 后缀代码不需要执行
        return;
      }
      // 判断购物车中是否存在选中的数据
      // 遍历数据源，将所有选中的数据单独存放到一个数组中
      let selectArr = []
      Object.keys(this.goodsList).forEach(item => {
        // 判断：是否处于选中状态
        if (this.goodsList[item].status) {
          selectArr.push(this.goodsList[item])
        }
      })
      // 判断是否有选中的商品
      if (selectArr.length === 0) {
        // 提示
        wx.showToast({
          title: '对不起还没有选择商品',
          icon: 'none',
          duration: 1000
        })
        return;
      }
      // 判断收货地址是否存在 
      if (!this.hasAddress) {
        // 提示
        wx.showToast({
          title: '请选择收货地址',
          icon: 'none',
          duration: 1000
        })
        return;
      }
      // 发起请求
      var res = await myrequest({
        url: 'https://autumnfish.cn/wx/api/public/v1/my/orders/create',
        method: 'POST',
        header: {
          Authorization: this.token
        },
        data: {
          order_price: this.totalPrice,
          consignee_addr: this.detailAdrress,
          goods: selectArr
        }
      })
      // 判断
      let { message, meta } = res.data
      if (meta.status === 200) {
        // 保存订单编号
        wx.setStorageSync('order', message.order_number)
        // 跳转到支付页面
        wx.navigateTo({
          url: '/pages/pay/main'
        })
      }
    }
  },
  // 通过计算属性来拼接详细地址
  computed: {
    detailAdrress() {
      return `${this.addressObj.provinceName}${this.addressObj.cityName}${this.addressObj.countyName}${this.addressObj.detailInfo}`;
    },
    // 商品总价
    totalPrice() {
      // 定义一个总价
      let price = 0
      // 遍历goodsList 计算总价
      for (var key in this.goodsList) {
        // 判断当前商品状态是否为 true
        if (this.goodsList[key].status) {
          price += this.goodsList[key].goods_price * this.goodsList[key].num
        }
      }
      return price;
    },
    totalNum() {
      let num = 0;
      // 遍历对象
      for (var key in this.goodsList) {
        if (this.goodsList[key].status) {
          num += this.goodsList[key].num
        }
      }
      return num;
    },
    // 用来决定当前全选框的状态
    selectAll() {
      let status = true
      // 遍历数据源，判断元素的状态
      for (var key in this.goodsList) {
        if (this.goodsList[key].status === false) {
          // 只要有一个没有选中，就让其为 false
          status = false
          break;
        }
      }
      // 将 status  返回
      return status
    }
  },
  // 当打开页面时需要动态获取收货地址
  onShow() {
    let address = wx.getStorageSync('address')
    // 判断 addreess 是否存在 
    if (address) {
      this.addressObj = address
      this.hasAddress = true
    }

    // 动态获取 cart 中的数据
    this.goodsList = wx.getStorageSync('cart') || {}
    // 动态获取 token 
    this.token = wx.getStorageSync('token') || ''
  }
}
</script>

<style lang="less">
@import "../../utils/css/iconfont.css";
page {
  background-color: #f4f4f4;
  padding-bottom: 97rpx;
}

.topmess {
  background-color: #fff;
  .mess {
    height: 208rpx;
    padding: 0px 18rpx;
    font-size: 14px;
    overflow: hidden;
    .user {
      display: flex;
      justify-content: space-between;
      margin-top: 45rpx;
      .left {}
      .right {}
    }
    .address {
      margin-top: 50rpx;
    }
  }

  .nomess {
    padding: 0px 18rpx;
    display: flex;
    justify-content: space-between;
    height: 100rpx;
    line-height: 100rpx;
  }

  .image {
    image {
      width: 100%;
      height: 14rpx;
      display: block;
    }
  }
}

.cart {
  margin-top: 20rpx;
  background-color: #fff;
  .title {
    padding-left: 30rpx;
    height: 87rpx;
    line-height: 87rpx;
    border-bottom: 1px solid #ddd;
  }
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
}

.bottom {
  width: 100%;
  height: 97rpx;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  text-align: center;
  .status {
    width: 88rpx;
  }
  .selectAll {
    flex: 3;
  }
  .total {
    text-align: left;
    flex: 4;
    .total-money {
      span {
        color: #eb4450;
      }
    }
    .send {
      font-size: 14px;
      color: #bbb;
    }
  }
  .payfor {
    flex: 4;
    height: 97rpx;
    line-height: 97rpx;
    background-color: #eb4450;
    color: white;
  }
}
</style>
