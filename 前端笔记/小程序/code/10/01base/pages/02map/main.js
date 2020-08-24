// 引入 SDK 文件
var qqmapwx = require('../../utils/qqmap-wx-jssdk.min.js')
// 创建一个 SDK 对象
var qqmapSDK;

// pages/02map/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 0,
    latitude: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 初始化 SDK 对象
    qqmapSDK = new qqmapwx({
      key: 'EHKBZ-24Z66-QB6SO-MSWUT-QLHZ6-MNBOJ'
    })

    // 获取当前位置
    wx.getLocation({
      success: (res) => {
        // console.log(res)
        this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 搜索周边：
    qqmapSDK.search({
      keyword: '酒店',
      success: res => {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})