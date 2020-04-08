// pages/parent/shopList/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    searchText: "",
    distanceValue: 0,
    areaValue: -1,
    distanceOption: [
      { text: "距离最近", value: 0 },
      { text: "距离最远", value: 1 }
    ],
    areaOption: [
      { text: "全部区域", value: -1 },
      { text: "禅城区", value: 0 },
      { text: "南海区", value: 1 },
      { text: "顺德区", value: 2 },
      { text: "狮山区", value: 3 }
    ],
    teachers: [
      {
        id: 42,
        name: "佛山萌娃托管中心",
        address: "佛山萌娃托管中心",
        station: "10月22日 00:00",
        number: 666,
        cover:
          "https://admin.yiyicareer.com/File/ClassroomBanner/25fa90fe41f23d5d4bae3c594326f965.png"
      },
      {
        id: 42,
        name: "佛山萌娃托管中心",
        address: "佛山萌娃托管中心",
        station: "10月22日 00:00",
        number: 666,
        cover:
          "https://admin.yiyicareer.com/File/ClassroomBanner/25fa90fe41f23d5d4bae3c594326f965.png"
      },
      {
        id: 42,
        name: "佛山萌娃托管中心",
        address: "佛山萌娃托管中心",
        station: "10月22日 00:00",
        number: 666,
        cover:
          "https://admin.yiyicareer.com/File/ClassroomBanner/25fa90fe41f23d5d4bae3c594326f965.png"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  onSearch(e) {
    console.log("onSearch", e);
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
