export default function(options) {
  const baseUrl = "http://152.136.185.210:8000/api/n3"
  // const baseUrl = "http://123.207.32.32:3000"
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      method:options.method||"get",
      success:resolve,
      fail:reject
    })
  })
}
