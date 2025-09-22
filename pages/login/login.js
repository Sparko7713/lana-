// pages/login/login.js
Page({
  data: {
    currentTab: 0, // 0: login, 1: register
    loginForm: {
      username: '',
      password: ''
    },
    registerForm: {
      avatar: '',
      nickname: '',
      username: '',
      password: '',
      confirmPassword: ''
    },
    isRegisterValid: false
  },

  onLoad: function(options) {
    // Hide tab bar on login page
    wx.hideTabBar({
      animation: false
    });
  },

  onShow: function() {
    // Hide tab bar when page shows
    wx.hideTabBar({
      animation: false
    });
  },

  // Switch between login and register tabs
  switchTab: function(e) {
    const tab = parseInt(e.currentTarget.dataset.tab);
    this.setData({
      currentTab: tab
    });
  },

  // Login form inputs
  onLoginUsernameInput: function(e) {
    this.setData({
      'loginForm.username': e.detail.value
    });
  },

  onLoginPasswordInput: function(e) {
    this.setData({
      'loginForm.password': e.detail.value
    });
  },

  // Register form inputs
  onNicknameInput: function(e) {
    this.setData({
      'registerForm.nickname': e.detail.value
    });
    this.validateRegisterForm();
  },

  onRegisterUsernameInput: function(e) {
    this.setData({
      'registerForm.username': e.detail.value
    });
    this.validateRegisterForm();
  },

  onRegisterPasswordInput: function(e) {
    this.setData({
      'registerForm.password': e.detail.value
    });
    this.validateRegisterForm();
  },

  onConfirmPasswordInput: function(e) {
    this.setData({
      'registerForm.confirmPassword': e.detail.value
    });
    this.validateRegisterForm();
  },

  // Avatar selection
  selectAvatar: function() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const tempFilePath = res.tempFilePaths[0];
        that.setData({
          'registerForm.avatar': tempFilePath
        });
        that.validateRegisterForm();
      },
      fail: function() {
        wx.showToast({
          title: '选择头像失败',
          icon: 'none'
        });
      }
    });
  },

  // Validate register form
  validateRegisterForm: function() {
    const form = this.data.registerForm;
    const isValid = form.nickname.trim().length >= 2 && 
                   form.username.trim().length >= 3 && 
                   form.password.trim().length >= 6 && 
                   form.password === form.confirmPassword &&
                   form.avatar !== '';
    
    this.setData({
      isRegisterValid: isValid
    });
  },

  // Handle login
  handleLogin: function() {
    const form = this.data.loginForm;
    
    if (!form.username.trim()) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      });
      return;
    }
    
    if (!form.password.trim()) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }

    // Show loading
    wx.showLoading({
      title: '登录中...'
    });

    // Simulate login API call
    setTimeout(() => {
      wx.hideLoading();
      
      // Save user info
      const app = getApp();
      const userInfo = {
        username: form.username,
        isLoggedIn: true
      };
      
      app.globalData.userInfo = userInfo;
      app.globalData.hasUserInfo = true;
      
      // Persist to storage
      wx.setStorageSync('userInfo', userInfo);
      
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      });
      
      // Navigate to home page
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/home/home'
        });
      }, 1500);
    }, 2000);
  },

  // Handle register
  handleRegister: function() {
    if (!this.data.isRegisterValid) {
      wx.showToast({
        title: '请完善注册信息',
        icon: 'none'
      });
      return;
    }

    const form = this.data.registerForm;

    // Show loading
    wx.showLoading({
      title: '注册中...'
    });

    // Simulate register API call
    setTimeout(() => {
      wx.hideLoading();
      
      // Save user info
      const app = getApp();
      const userInfo = {
        username: form.username,
        nickname: form.nickname,
        avatar: form.avatar,
        isLoggedIn: true
      };
      
      app.globalData.userInfo = userInfo;
      app.globalData.hasUserInfo = true;
      
      // Persist to storage
      wx.setStorageSync('userInfo', userInfo);
      
      wx.showToast({
        title: '注册成功',
        icon: 'success'
      });
      
      // Navigate to home page
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/home/home'
        });
      }, 1500);
    }, 2000);
  }
});