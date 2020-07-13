let ajaxTimes = 0
export const request = (params) => {
  ajaxTimes++
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
  return new Promise((resolve, reject) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    var reqTask = wx.request({
      ...params,
      url: baseUrl + params.url,
      success: (result) => {
        resolve(result.data.message)
      },
      fail: (err) => {
        reject(err)
      },
      complete: () => {
        ajaxTimes--
        if(ajaxTimes === 0) wx.hideLoading() // 关闭正在等待的图标    
      }
    });
  })
}