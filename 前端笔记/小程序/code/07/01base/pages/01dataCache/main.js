// pages/01dataCache/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  // 向 storage 中存储数据
  savestorage() {
    // 向 storage 中存储数据
    // 异步存储
    // wx.setStorage({
    //   key: 'mess',
    //   data: 'xjj最帅'
    // })
    // 同步存储
    wx.setStorageSync('mess', 'xjj最帅')
  },
  // 从 storage 中取出数据
  getstorage() {
    // 异步取值
    // wx.getStorage({
    //   key: 'mess',
    //   success: function(res) {
    //     console.log(res.data)
    //   },
    // })
    // 同步取值
    let res = wx.getStorageSync('mess')
    console.log(res)
  },
  // 从 storage 中清除数据
  clearstorage() {
    // 异步清除
    // wx.removeStorage({
    //   key: 'mess',
    //   success: function(res) {
    //     console.log(res)
    //   },
    // })
    // 同步清除
    let res = wx.removeStorageSync('mess')
    console.log(res)
  },
  ccstorage() {
    // 会将所有的 storage 全部清除
    wx.clearStorage()
  },
  // 向 storage 中存储对象
  setObj() {
    // 创建一个对象
    let girlFriend = {
      name: 'lyf',
      age: 16
    }
    wx.setStorageSync('gf', girlFriend)
  },
  setArr() {
    // 存储数组
    let arr = [1, 1, 1, 1, 1]
    wx.setStorageSync('arr', arr)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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