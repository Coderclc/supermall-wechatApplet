export default function(options) {
  const baseUrl = "http://152.136.185.210:8000/api/n3"
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + options.url,
      method:options.method||"get",
      data:options.data||{},
      success:resolve,
      fail:reject
    })
  })
}
