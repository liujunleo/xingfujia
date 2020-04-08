const app = getApp();
Page({
  data: {
    user: {}
  },
  onShow() {
    // this.getData();
    if(typeof this.getTabBar === 'function' && this.getTabBar()){
      this.getTabBar().setData({
        selected: 3
      })
    }
  },
  // 转发事件
  onShareAppMessage(res) {
    return {
      title: `YiYi英语淘金社`,
      path: `/pages/index/index`,
      imageUrl: "/images/share.jpeg",
      success: res => {
        console.log("转发成功", res);
      },
      fail: res => {
        console.log("转发失败", res);
      }
    };
  },
  getData() {
    if (!app.globalData.userId) {
      wx.redirectTo({
        url: "../login/index"
      });
      return;
    }
    app
      .get(`api/program/users/${app.globalData.userId}/achievement`)
      .then(res => {
        this.setData({
          user: res.data || {}
        });
      });
  },
  onGotUserInfo(e) {
    let userRes = e.detail.userInfo || {};
    let userInfo = null;
    if (typeof userRes === "string") {
      userInfo = JSON.parse(userRes);
    } else if (typeof userRes === "object") {
      userInfo = userRes;
    }
    if (userInfo) {
      app.setUser(userInfo);
      app.updateUser(userInfo);
      let user = this.data.user || {};
      user.avatar = userInfo.avatarUrl;
      user.name = userInfo.nickName;
      this.setData({
        user: user
      });
    }
  },
  withdrawTap() {
    if (this.data.user.wait_to_withdraw < 100) {
      app.alert("需大于等于100元才可提现");
      return;
    }
    app.loading("发起申请..");
    app
      .post(`api/program/users/${app.globalData.userId}/withdraw`)
      .then(res => {
        app.hideLoading();
        this.getData();
        app.alert("提现申请成功，请等待审核");
      })
      .catch(res => {
        app.hideLoading();
      });
  },
  logoutTap() {
    app.logout();
  }
});
