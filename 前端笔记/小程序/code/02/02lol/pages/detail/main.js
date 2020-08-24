// 数据源
const detailList = require('../../utils/lol_details_duowan.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 数据的 id
    id: '',
    // 数据源
    detailList,
    // 详情对象
    obj: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 得到 id
    this.setData({
      id: options.id
    })
    // 根据 id 去数据源中得到详情对象
    this.data.detailList.forEach(item => {
      // 判断
      if (item.id === this.data.id) {
        this.setData({
          obj: item
        })
      }
    })
    // 动态设置页面标题
    wx.setNavigationBarTitle({
      title: `${this.data.obj.title}-${this.data.obj.name}`,
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