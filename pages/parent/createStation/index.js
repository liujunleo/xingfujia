const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    name: "",
    wechat: "",
    phone: "",
    area: "",
    type: 0,
    typeOption: [{ text: "社区服务中心", value: 0 }, { text: "机构服务", value: 1 }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      userInfo: app.globalData.userInfo || {},
      phone: app.globalData.userInfo ? app.globalData.userInfo.phone : ""
    });
  },
  submit() {
    app.loading();
    app
      .post(`/ptmk/ptmkauditmerchant/save`, {
        address: this.data.area,
        area: this.data.area,
        createType: this.data.type,
        linkman: this.data.name,
        phone: this.data.phone,
        wxNumber: this.data.wechat
      })
      .then(res => {
        app.hideLoading();
        if (res.code === 0) {
          app.toast("申请成功");
          setTimeout(() => {
            wx.switchTab({
              url: "/pages/parent/index/index"
            });
          }, 1000);
        } else {
          app.info(res.msg);
        }
      })
      .catch(res => {
        console.log("res", res);
        app.hideLoading();
      });
  },
  bindNameInput(e) {
    this.setData({
      name: e.detail
    });
  },
  bindWechatInput(e) {
    this.setData({
      wechat: e.detail
    });
  },
  bindPhoneInput(e) {
    this.setData({
      phone: e.detail
    });
  },
  bindAreaInput(e) {
    this.setData({
      area: e.detail
    });
  },

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
