// pages/01lifcircle/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  to02() {
    wx.navigateTo({
      url: '/pages/02target/main',
    })
  },
  redirect02() {
    // 跳转到 02 关闭当前页面
    wx.redirectTo({
      url: '/pages/02target/main',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('page-onLoad')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    console.log('apge-onReady')
  },

  /**
   * 生命周期函数--监听页面/切前台时显示
   */
  onShow: function() {
    console.log('page-onShow')
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    console.log('page-onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('page-onUnload')
  }
})