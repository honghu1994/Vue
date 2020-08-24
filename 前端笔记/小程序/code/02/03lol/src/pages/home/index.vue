<template>
  <div class="box">
    <div @click="toDetail(item.id)" class="mybox" v-for="(item, index) in herosList" :key="index">
      <img :src="item.iconUrl" alt="">
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<script>
// 导入数据
import herosList from '../../utils/lol_duowan.js'
export default {
  data() {
    return {
      herosList
    }
  },
  methods: {
    toDetail(id) {
      // 跳转
      wx.navigateTo({
        url: `/pages/detail/main?id=${id}`
      })
    }
  }
}
</script>

<style>
page {
  background-color: #576878;
}

.box {
  display: flex;
  flex-wrap: wrap;
}

.mybox {
  margin-top: 10px;
  width: 33.333%;
  text-align: center;
}

.mybox img {
  width: 100px;
  height: 100px;
}
</style>
