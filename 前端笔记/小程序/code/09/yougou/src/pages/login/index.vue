<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="getInfo">点我登录</button>
  </div>
</template>

<script>
// 目标：
//  请求服务器请求，获取 token
//  - code: 通过 wx.login
//  - 其它参数 getUserInfo
//   - encryptedData
//   - iv
//   - rawData
//   -  signature

export default {
  data() {
    return {
      code: '',
      encryptedData: '',
      iv: '',
      rawData: '',
      signature: '',
      token: ''
    }
  },
  methods: {
    getInfo(res) {
      this.encryptedData = res.mp.detail.encryptedData
      this.iv = res.mp.detail.iv
      this.rawData = res.mp.detail.rawData
      this.signature = res.mp.detail.signature
      // 得到 code
      wx.login({
        success: res => {
          this.code = res.code
          // 请求服务器接口，得到接口中返回的 token
          wx.request({
            url: 'https://autumnfish.cn/wx/api/public/v1/users/wxlogin',// appid 由接口的所有者来提供
            method: 'POST',
            data: {
              code: this.code,
              encryptedData: this.encryptedData,
              iv: this.iv,
              rawData: this.rawData,
              signature: this.signature
            },
            success: res => {
              wx.setStorageSync('token', res.data.message.token)
              // 返回上一个页面
              wx.navigateBack()
            }
          })
        }
      })
    }
    // 获取请求服务器的参数
    // getParams() {
    //   wx.login({
    //     success: res => {
    //       this.code = res.code
    //       // 获取其它参数
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(res)
    //         }
    //       })
    //     }
    //   })
    // }
  },
  mounted() {
  }
}
</script>

<style>

</style>
