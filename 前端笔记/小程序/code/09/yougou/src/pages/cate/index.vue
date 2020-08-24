<template>
  <div>
    <!-- 头部搜索组件 -->
    <tophead />
    <!-- 内容区域 -->
    <div class="content">
      <div class="left">
        <!-- 左侧的内容 -->
        <div class="box">
          <div @click="changeIndex(index)" :class="{ active: selectedIndex === index }" class="navItem" v-for="(item, index) in cateList" :key="index">
            {{ item.cat_name }}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <!-- 图片 -->
          <image class="topimg" src="/static/imgs/titleImage.png"></image>
          <div class="cateitem" v-for="(item, index) in cateList[selectedIndex].children" :key="index">
            <div class="title">
              /
              <span>{{ item.cat_name }}</span> /
            </div>
            <div class="list">
              <div @click="toSearchList(subitem.cat_name)" class="list-item" v-for="(subitem,subindex) in item.children" :key="subindex">
                <image class="img" :src="'https://autumnfish.cn/wx/' + subitem.cat_icon"></image>
                <div class="name">{{ subitem.cat_name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

// 导入头部搜索组件
import tophead from '../../components/tophead.vue'
// 导入 myrequest 
import myrequest from '../../utils/myrequest.js'

export default {
  data() {
    return {
      // 默认选中的元素
      selectedIndex: 0,
      // 分类的数据源
      cateList: []
    }
  },
  methods: {
    // 改变激活的元素
    changeIndex(index) {
      this.selectedIndex = index
    },
    // 得到分类数据
    async getCateList() {
      // 开启加载动画
      wx.showLoading({
        title: '数据加载中...'
      });
      let res = await myrequest({
        url: 'https://autumnfish.cn/wx/api/public/v1/categories'
      })
      // 解构
      let { message, meta } = res.data
      // 判断
      if (meta.status === 200) {
        this.cateList = message;
      }
      // 隐藏加载动画
      wx.hideLoading()
    },
    // 跳转到搜索列表
    toSearchList(name) {
      wx.navigateTo({
        url: `/pages/searchList/main?name=${name}`
      })
    }
  },
  mounted() {
    // 得到分类数据
    this.getCateList()
  },
  components: {
    tophead
  }
}
</script>

<style lang="less">
.content {
  width: 100%;
  position: absolute;
  top: 100rpx;
  bottom: 0px;
  display: flex;
  .left {
    width: 198rpx;
    height: 100%;
    overflow: auto;
    .box {
      width: 190rpx;
      background-color: blue;
      .navItem {
        width: 198rpx;
        height: 100rpx;
        background: #f4f4f4;
        line-height: 100rpx;
        text-align: center;
        &.active {
          background: #fff;
          color: #eb4450;
          position: relative;
          &:before {
            content: '';
            width: 8rpx;
            height: 60rpx;
            background-color: #eb4450;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
  .right {
    flex: 1;
    height: 100%;
    overflow: auto;
    .item {
      padding: 20rpx 16rpx;
      .topimg {
        width: 100%;
        height: 178rpx;
      }
      .cateitem {
        .title {
          text-align: center;
          color: #e0e0e0;
          span {
            color: #333;
            margin: 0 20rpx;
            line-height: 110rpx;
            ;
          }
        }
        .list {
          display: flex;
          flex-wrap: wrap;
          .list-item {
            margin-top: 40rpx;
            width: 33.333%;
            text-align: center;
            .img {
              width: 100rpx;
              height: 70rpx;
            }
            .name {
              font-size: 12px;
              line-height: 50rpx;
            }
          }
        }
      }
    }
  }
}
</style>
