// pages/home/home.js
Page({
  data: {
    userInfo: {}
  },

  onLoad: function(options) {
    const app = getApp();
    
    // Check if user is logged in
    if (!app.globalData.hasUserInfo) {
      wx.reLaunch({
        url: '/pages/login/login'
      });
      return;
    }
    
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

  onShow: function() {
    // Show tab bar on home page
    wx.showTabBar({
      animation: true
    });
  },

  handleLogout: function() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          // Clear user data
          const app = getApp();
          app.globalData.userInfo = null;
          app.globalData.hasUserInfo = false;
          
          // Clear storage
          wx.removeStorageSync('userInfo');
          
          // Navigate to login
          wx.reLaunch({
            url: '/pages/login/login'
          });
        }
      }
    });
  }
});