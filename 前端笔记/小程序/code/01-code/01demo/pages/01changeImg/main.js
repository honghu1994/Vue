// pages/01changeImg/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 图片的数据源：
    imgList: [
      "https://img.alicdn.com/imgextra/i1/693739777/TB2TW6MtwxlpuFjy0FoXXa.lXXa_!!693739777-0-daren.jpg_180x180xzq90.jpg_.webp",
      "https://img.alicdn.com/imgextra/i3/1730639958/O1CN01vf16hC2NQoUkrEhPk_!!1730639958-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp",
      "https://img.alicdn.com/imgextra/i2/3208450429/TB2Gpy2weuSBuNjSsziXXbq8pXa_!!3208450429-0-beehive-scenes.jpg_180x180xzq90.jpg_.webp"
    ],
    // 定义一个显示的下标
    selectedIndex: 0
  },

  // 点击按钮时会触发
  fn() {
    // console.log('这是我第一次给小程序中的按钮绑定事件，好开心')
    // 在事件中修改 data  中的 selectedIndex
    // this.selectedIndex = this.selectedIndex + 1
    // 如果在小程序需要使用到 data中的数据必须通过 data点出来
    // console.log(this.data.selectedIndex)
    // this.data.selectedIndex = this.data.selectedIndex + 1
    // console.log(this.data.selectedIndex)
    // 如果要小程序中的视图跟着数据来改变，需要通过其它方式来修改参数
    // this.setData({
    //   selectedIndex: this.data.selectedIndex + 1 === 3 ? 0 : this.data.selectedIndex + 1
    // })
    this.setData({
      selectedIndex: (this.data.selectedIndex + 1) % 3
    })
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