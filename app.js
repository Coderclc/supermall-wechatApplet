App({
  onLaunch() {
    // 获取本地token
    const token = wx.getStorageSync("token")
    if (token) {
      this.verifyToken(token)
    } else {
      this.login()
    }
  },
  login() {
    // 获取code 发送至 developerService
    wx.login({
      success: res => {
        const code = res.code
        wx.request({
          url: 'http://123.207.32.32:3000/login',
          method: "post",
          data: {code},
          success: res => {
            // 将token全局和本地存储
            const token = res.data.token
            this.globalData.token = token
            wx.setStorageSync('token', token)
          }
        })
      }
    })
  },
  verifyToken(token){
    // 发送token验证term
    wx.request({
      url: 'http://123.207.32.32:3000/auth',
      method:"post",
      header:{token},
      success:res=>{
        // 有 errorCode reload
        if(res.data.errorCode){
          this.login()
        }else{
          this.globalData.token = token
        }
      }
    })
  },
  globalData: {
    token: ""
  }
})