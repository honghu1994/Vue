<template>
  <div>
    <!-- 轮播图 -->
    <swiper class="myswiper" indicator-dots autoplay interval="2000" duration="200">
      <block v-for="(item, index) in obj.bgs" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image" width="355" height="150" />
        </swiper-item>
      </block>
    </swiper>
    <!-- 内容 -->
    <view class="box">
      <view class="left">
        <!-- 称号 -->
        <view class="nickname">{{ obj.title }}</view>
        <!-- 名称 -->
        <view class="name">{{ obj.name }}</view>
        <!-- 定位 -->
        <view class="tag">
          <text v-for="(item, index) in obj.tags" :key="index">{{item}}</text>
        </view>
        <view class="ab">
          <view class="ab-item">
            <view>生存能力：</view>
            <progress stroke-width="10" active activeColor="#20c76d" :percent="obj.Ability.life" />
          </view>
          <view class="ab-item">
            <view>物理攻击：</view>
            <progress stroke-width="10" active activeColor="#f2c700" :percent="obj.Ability.physical" />
          </view>
          <view class="ab-item">
            <view>魔法攻击：</view>
            <progress stroke-width="10" active activeColor="#f6a201" :percent="obj.Ability.magic" />
          </view>
          <view class="ab-item">
            <view>操作难度：</view>
            <progress stroke-width="10" active activeColor="#c78cfd" :percent="obj.Ability.difficulty" />
          </view>
        </view>
      </view>
      <view class="right">
        {{ obj.story }}
      </view>
    </view>
  </div>
</template>

<script>
// 导入数据源
import detailList from '../../utils/lol_details_duowan.js';

export default {
  data() {
    return {
      id: '',
      obj: {},
      detailList
    }
  },
  // 接收参数
  onLoad(options) {
    this.id = options.id
    // console.log(options.id)
    // 遍历数据源
    this.detailList.forEach(item => {
      // 判断传递过来的 id 是否与当前遍历对应的 id 相同
      if (item.id === this.id) {
        // 如果相同，将当前对象赋值给 obj
        this.obj = item;
      }
    })
    // 动态设置导航文本
    wx.setNavigationBarTitle({
      title: `${this.obj.title}-${this.obj.name}`
    })
  }
}
</script>

<style>
page {
  background-color: #363636;
}

.myswiper {
  width: 100%;
}

.myswiper image {
  width: 100%;
}

.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  color: white
}

.box .left {
  flex: 1;
}

.box .left .nickname {
  font-size: 16px;
  font-weight: 700;
}

.box .left .name {
  font-size: 20px;
  font-weight: 700;
  line-height: 40px;
}

.box .left .tag text {
  font-size: 12px;
  display: inline-block;
  padding: 3px 10px;
  background-color: #0c9c7d;
  border-radius: 5px;
  margin-right: 7px;
}

.box .left .ab {
  padding: 0 5px;
}

.box .left .ab .ab-item {
  margin-top: 6px;
  display: flex;
}

.box .left .ab .ab-item view {
  font-size: 12px;
}

.box .left .ab .ab-item progress {
  flex: 1;
}

.box .right {
  flex: 1;
  font-size: 12px;
}
</style>
