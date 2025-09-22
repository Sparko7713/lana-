// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 检查用户登录状态
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
      this.globalData.hasUserInfo = true
    }

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  
  onShow() {
    // 如果用户未登录，跳转到登录页
    if (!this.globalData.hasUserInfo) {
      wx.reLaunch({
        url: '/pages/login/login'
      })
    }
  },
  
  globalData: {
    userInfo: null,
    hasUserInfo: false
  }
})