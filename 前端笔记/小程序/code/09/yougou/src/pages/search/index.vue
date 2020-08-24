<template>
  <div>
    <!-- 搜索区域 -->
    <div class="search">
      <div class="input">
        <input @input="inputSearch" @confirm="toSearchList" v-model="query" class="ipt" placeholder="请输入要搜索的内容" type="text">
        <button @click="clearQuery" v-if="isShow" class="btn">取消</button>
        <icon type="search" size="16"></icon>
        <div v-if="thinkList.length !=0" class="think">
          <div :class="{bgcColor: selecindex === index}" @click="thinkToSearch(item.goods_name, index)" class="item" v-for="(item, index) in thinkList" :key="index">
            {{ item.goods_name }}
          </div>
        </div>
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="history">
      <div class="title">
        <div class="name">搜索历史</div>
        <icon @click="removeSearch" type="clear" size="16"></icon>
      </div>
      <div class="list">
        <div @click="historyToSearch(item)" class="item" v-for="(item, index) in searchList" :key="index">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 引入 myrequest
import myrequest from '../../utils/myrequest'

export default {
  data() {
    return {
      // 搜索的关键键字
      query: '',
      // 搜索的数组
      searchList: [],
      // 联想数据
      thinkList: [],
      // 设置默认选中的元素
      selecindex: -1,
      // 定时器
      timer: null
    }
  },
  methods: {
    // 清除内容
    clearQuery() {
      this.query = ''
      // 将联想的数据也重置为空
      this.thinkList = []
      this.selecindex = -1
    },
    // 跳转到搜索列表页面
    toSearchList(event) {
      // 搜索的关键字
      let search = event.target.value;
      // 判断输入框中的内容是否为空
      if (search.trim() === '') {
        this.query = ''
        return
      }

      // 将搜索的关键字保存到 searchList 中
      this.searchList.unshift(search)
      // 去重
      this.searchList = [...new Set(this.searchList)]
      // 将搜索信息保存到 storage 中
      wx.setStorageSync('search', this.searchList)

      // 跳转到搜索页面
      wx.navigateTo({
        url: `/pages/searchList/main?name=${search}`
      })
      // console.log(event.target.value)
    },
    // 点击搜索历史跳转到搜索列表
    historyToSearch(name) {
      // 设置 query
      this.query = name
      // 将关键字添加到 searchList 中
      this.searchList.unshift(name)
      // 去重
      this.searchList = [...new Set(this.searchList)]
      // 重新保存到 storage 中
      wx.setStorageSync('search', this.searchList)

      wx.navigateTo({
        url: `/pages/searchList/main?name=${name}`
      })
    },
    removeSearch() {
      // 显示一个提示框：确定 取消按钮
      wx.showModal({
        title: '提示',
        content: '您确定要删除吗',
        success: res => {
          if (res.confirm) {
            // 清除 storage
            wx.removeStorageSync('search')
            // 清除 searchList
            this.searchList = []
          }
        }
      })
    },
    // 当向输入框中输入内容时，会触发事件
    inputSearch(event) {
      // 进行判断: 是否存在定时器
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(async () => {
        // 1.0 得到输入的内容
        let key = event.target.value
        // 判断 key 是否为空
        if (key.trim() === '') {
          this.thinkList = []
          return;
        }
        // 2.0 发送请求得到数据
        let res = await myrequest({
          url: 'https://autumnfish.cn/wx/api/public/v1/goods/search',
          data: {
            query: key,
            pagesize: 6,
            pagenum: 1
          }
        })
        // 3.0 渲染
        let { message, meta } = res.data
        if (meta.status === 200) {
          this.thinkList = message.goods
        }
      }, 500)

    },
    // 点击联想选项跳转到搜索列表
    thinkToSearch(name, index) {
      this.selecindex = index
      wx.navigateTo({
        url: `/pages/searchList/main?name=${name}`
      })
    },
  },
  // 当页面显示时触发
  onShow() {
    this.query = ''
    this.thinkList = []
    this.selecindex = -1
  },
  computed: {
    // 添加一个属性：isShow
    isShow: function() {
      // 判断 query
      if (this.query === '') {
        return false
      } else {
        return true
      }
    }
  },
  mounted() {
    // 获取搜索历历史
    this.searchList = wx.getStorageSync('search') || []
  }
}
</script>

<style lang="less">
.search {
  width: 100%;
  height: 120rpx;
  padding: 30rpx 16rpx;
  background-color: #eeeeee;
  box-sizing: border-box;
  .input {
    display: flex;
    justify-content: space-between;
    position: relative;
    .ipt {
      flex: 1;
      padding-left: 70rpx;
      height: 60rpx;
      background-color: #fff;
    }
    .btn {
      width: 160rpx;
      height: 64rpx;
      margin-left: 20rpx;
      box-sizing: border-box;
      font-size: 14px;
      line-height: 64rpx;
    }
    icon {
      position: absolute;
      top: 50%;
      left: 20rpx;
      transform: translateY(-50%);
    }
    .think {
      padding: 20rpx;
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      background-color: #eee;
      .item {
        font-size: 14px;
        line-height: 60rpx;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #999;
      }
    }
  }
}

.history {
  padding: 0 16rpx;
  .title {
    height: 88rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      height: 64rpx;
      line-height: 64rpx;
      padding: 0 25rpx;
      background-color: #ddd;
      margin-right: 30rpx;
      margin-bottom: 18rpx;
      font-size: 14px;
    }
  }
}

.bgcColor {
  background-color: #aaa;
}
</style>
