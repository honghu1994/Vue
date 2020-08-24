// pages/02set/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // // 得到一个数组
    // let arr = [1, 2, 3, 4, 3, 2, 1];
    // // 进行去重
    // // 创建一个新的数组，用来接收元素
    // let newArr = []
    // // 遍历 arr
    // arr.forEach(item => {
    //   // 判断 item 在 newArr 中是否存在
    //   if (newArr.indexOf(item) === -1) {
    //     // 将元素 push 到数组中
    //     newArr.push(item)
    //   }
    // })
    // console.log(newArr)

    // 使用 ES6 中提供的新的对象 set 来进行去重
    let arr = [1, 2, 3, 4, 3, 2, 1]
    let newArr = [...new Set(arr)]
    console.log(newArr)
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