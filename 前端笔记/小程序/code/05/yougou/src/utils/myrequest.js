// 使用 promise 封装 wx.request

function myrequest(options) {
  return new Promise((resolve, reject) => {
    // 发送请求
    wx.request({
      url: options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: options.header || {},
      success: res => {
        resolve(res);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

// 暴露接口
export default myrequest;
