import Notify from "../../../assets/vant/notify/notify";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    setInter: null,
    time: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  // 开始计时器
  startSetInter: function() {
    this.data.setInter = setInterval(() => {
      this.showTime();
    }, 1000);
  },
  // 展示当前时间
  showTime() {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    this.setData({
      time:
        (hour < 10 ? "0" : "") +
        hour +
        ":" +
        (minute < 10 ? "0" : "") +
        minute +
        ":" +
        (second < 10 ? "0" : "") +
        second
    });
  },
  onTap() {
    Notify({ type: "success", message: "打卡成功" });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.startSetInter();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    clearInterval(this.data.setInter);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    clearInterval(this.data.setInter);
  },

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
