//app.js
App({
  onLaunch: function () {
    this.getDataByStorage();

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // 获取缓存的session-验证是否有效
  getDataByStorage() {
    let userId = wx.getStorageSync("userId") || "";
    let user = wx.getStorageSync("user") || {};
    this.globalData.userId = userId;
    this.globalData.user = user;
  },
  // 设置用户相关信息
  setUser(userInfo) {
    this.globalData.userInfo = userInfo;
    wx.setStorageSync("userInfo", userInfo);
  },
  // 更新用户信息
  updateUser(userInfo) {
    this.globalData.userInfo.avatarUrl = userInfo.avatarUrl;
    this.globalData.userInfo.city = userInfo.city;
    this.globalData.userInfo.country = userInfo.country;
    this.globalData.userInfo.gender = userInfo.gender;
    this.globalData.userInfo.language = userInfo.language;
    this.globalData.userInfo.nickName = userInfo.nickName;
    this.globalData.userInfo.province = userInfo.province;
    let postUser = {
      user_id: this.globalData.userId,
      avatarurl: userInfo.avatarUrl,
      city: userInfo.city,
      country: userInfo.country,
      gender: userInfo.gender,
      language: userInfo.language,
      nickname: userInfo.nickName,
      province: userInfo.province
    };
    this.post(`api/program/users/update`, postUser).then(res => {
      if (res.code == 0) {
        // 更新成功
      } else {
        this.alert(res.message);
      }
    });
    return this.globalData.userInfo;
  },
  globalData: {
    userInfo: {},
    // 1家长 2老师
    userType: 1,
    userInfo: null,
    parantTabbar: {
      selected: 0,
      color: "#999999",
      selectedColor: "#e8393f",
      list: [{
        "pagePath": "/pages/parent/index/index",
        "iconPath": "/assets/images/home.png",
        "selectedIconPath": "/assets/images/home_checked.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/parent/shop/index",
        "iconPath": "/assets/images/shop.png",
        "selectedIconPath": "/assets/images/shop_checked.png",
        "text": "商城"
      },
      {
        "pagePath": "/pages/parent/baby/index",
        "iconPath": "/assets/images/baby.png",
        "selectedIconPath": "/assets/images/baby_checked.png",
        "text": "宝宝档单"
      },
      {
        "pagePath": "/pages/parent/my/index",
        "iconPath": "/assets/images/my.png",
        "selectedIconPath": "/assets/images/my_checked.png",
        "text": "个人中心"
      }]
    },
    teacherTabbar: {
      selected: 0,
      color: "#999999",
      selectedColor: "#e8393f",
      list: [{
        "pagePath": "/pages/parent/index/index",
        "iconPath": "/assets/images/home.png",
        "selectedIconPath": "/assets/images/home_checked.png",
        "text": "首页"
      },
      {
        "pagePath": "/pages/common/userType/index",
        "iconPath": "/assets/images/shop.png",
        "selectedIconPath": "/assets/images/shop_checked.png",
        "text": "我的"
      }]
    },
  }
})