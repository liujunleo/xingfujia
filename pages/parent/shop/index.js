var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    goodsList: [],
    goodsType: [],
    checkedType: ""
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getGoodsList();
    this.getGoodsType();
  },
  getGoodsType() {
    app
      .post(`/ptmk/ptmkgoodscategory/list`)
      .then(res => {
        this.setData({
          goodsType: res.data
        });
      })
      .catch(res => {
        console.log("res", res);
      });
  },
  getGoodsList() {
    const params = {
      categoryId: 1,
      limit: 10,
      name: "",
      order: "",
      page: 1,
      sidx: ""
    };
    app
      .post(`/ptmk/ptmkgoods/list`, params)
      .then(res => {
        this.setData({
          goodsList: res.data.list
        });
      })
      .catch(res => {
        console.log("res", res);
      });
  },
  onGoodsChange(event) {
    const item = this.data.goodsType[event.detail - 1];
    this.setData({
      checkedType: item ? item.id : ""
    });
  },
  onServiceChange(event) {
    wx.showToast({
      icon: "none",
      title: `切换至第${event.detail}项`
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

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
