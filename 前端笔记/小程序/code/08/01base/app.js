//app.js
App({
  /*
   * 生命周期：小程序运行时执行的函数 
   */
  onLaunch() {
    console.log('app-onLaunch')
  },
  /*
   *  生命周期：小程序显示时执行/切前台的函数
   */
  onShow(event) {
    console.log('app-onShow')
    console.log('---------------------得到场景值-----------------------')
    console.log(event)
    console.log('---------------------得到场景值-----------------------')
  },
  /*
   * 生命周期：当小程序切后台时执行
   */
  onHide() {
    console.log('app-onHide')
  }
})