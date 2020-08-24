// 导入SDK
let qqmapwx = require('../../utils/qqmap-wx-jssdk.min.js')
let qqmapSDK;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: 0,
    latitude: 0,
    // 搜索出来的结果
    marks: []
    // marks: [{ longitude: '', latitude: '', iconPath: '' } ]
  },
  // 搜索周边
  search(event) {
    // 得到关键字
    let key = event.detail.value
    // 搜索周边
    qqmapSDK.search({
      keyword: key,
      success: res => {
        console.log(res)
        // 将搜索出来的结果进行赋值
        res.data.forEach(item => {
          this.setData({
            marks: [
              ...this.data.marks,
              {
                longitude: item.location.lng,
                latitude: item.location.lat,
                iconPath: '/utils/imgs/p.png',
                title: item.title
              }
            ]
          })
        })
        console.log(this.data.marks)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 初始化SDK
    qqmapSDK = new qqmapwx({
      key: 'EHKBZ-24Z66-QB6SO-MSWUT-QLHZ6-MNBOJ'
    })
    // 获取当前位置
    wx.getLocation({
      success: res => {
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