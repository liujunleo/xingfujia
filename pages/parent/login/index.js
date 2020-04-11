var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: "",
    code: "",
    seconds: 60,
    showCountDown: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  bindPhoneInput(e) {
    this.setData({
      phone: e.detail
    });
  },
  bindCodeInput(e) {
    this.setData({
      code: e.detail
    });
  },
  sendCode() {
    if (!this.data.phone) {
      app.info("请输入手机号");
      return;
    }
    if (!/^1[3456789]\d{9}$/.test(this.data.phone)) {
      app.info("请输入正确的手机号");
      return;
    }

    this.setData(
      {
        showCountDown: true
      },
      _ => {
        this.countDown(this, 60);
      }
    );
    app
      .get(`/jzmk/jzmkuser/registrationMessage`, { phone: this.data.phone })
      .then(res => {})
      .catch(res => {
        console.log("res", res);
        this.setData({
          showCountDown: false
        });
      });
  },
  login() {
    if (!this.data.phone) {
      app.info("请输入手机号");
      return;
    }
    if (!/^1[3456789]\d{9}$/.test(this.data.phone)) {
      app.info("请输入正确的手机号");
      return;
    }
    if (!this.data.code) {
      app.info("请输入短信验证码");
      return;
    }
    app
      .get(`/jzmk/jzmkuser/registerOrLogin`, { phone: this.data.phone, code: this.data.code })
      .then(res => {
        app.globalData.token = res.data;
        wx.setStorageSync("token", res.data);
        wx.switchTab({
          url: "/pages/parent/index/index"
        });
      })
      .catch(res => {
        console.log("res", res);
      });
  },

  // 倒计时60秒
  countDown(that, seconds) {
    if (seconds == 0 || !that.data.showCountDown) {
      that.setData({
        seconds: seconds,
        showCountDown: false
      });
      return;
    }
    that.setData({
      seconds: seconds
    });
    setTimeout(function() {
      seconds--;
      that.countDown(that, seconds);
    }, 1000);
    0;
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
