// pages/parent/my/additionalServices/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showDialog: false,
    showStore: false,
    showTeacher: false,
    showTime: false,
    value1: 0,
    option1: [
      { text: "全部商品", value: 0 },
      { text: "新款商品", value: 1 },
      { text: "活动商品", value: 2 }
    ],
    array: ["美国", "中国", "巴西", "日本"],
    index: 0,
    storeId: 0,
    stores: [
      {
        id: 1,
        name: '选项1'
      },
      {
        id: 2,
        name: '选项2'
      },
      {
        id: 3,
        name: '选项3'
      }
    ],
    minHour: 10,
    maxHour: 20,
    minDate: new Date().getTime(),
    currentDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  onStoreClick(){
    this.setData({ showStore: true });
  },
  onTeacherClick(){
    this.setData({ showTeacher: true });
  },
  onTimeClick(){
    this.setData({ showTime: true });
  },
  onDialogClose() {
    this.setData({ showDialog: false });
  },
  onStoreClose() {
    this.setData({ showStore: false });
  },
  onTeacherClose() {
    this.setData({ showTeacher: false });
  },
  onTimeClose() {
    this.setData({ showTime: false });
  },
  onSelect(event) {
    console.log(event.detail);
  },
  onOrderClick (){
    this.setData({ showDialog: true });
  },
  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
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
