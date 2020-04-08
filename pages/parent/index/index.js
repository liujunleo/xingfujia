// pages/common/userType/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: 0,
    currentIndex: 0,
    banners: [
      {
        id: "",
        link:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584294627438&di=3e171b9096947a8790d752a5102c4b5f&imgtype=0&src=http%3A%2F%2Fpic1.zhimg.com%2Fv2-9dc369fb9a66525d2ec5d836c65aac46_1200x500.jpg",
        type: "3",
        target: "#"
      },
      {
        id: "",
        link:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584294627437&di=02dea3d0d91871f8a9e1704bfaec6732&imgtype=0&src=http%3A%2F%2Fp0.meituan.net%2Fwedding%2F3f6db0dfc6b9a102048584fbf6045ec1554771.jpg",
        type: "3",
        target: "#"
      },
      {
        id: "",
        link:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584294627433&di=dc68f748d63c7a105e294e1640f7a1db&imgtype=0&src=http%3A%2F%2F01.imgmini.eastday.com%2Fmobile%2F20180730%2F20180730161446_c8f71a037e3572325f22e9565223df3d_1.jpeg",
        type: "3",
        target: "#"
      }
    ],
    stores: [
      {
        id: 42,
        name: "1对4试听",
        address: "1对4试听课",
        station: "10月22日 00:00",
        number: 666,
        cover:
          "https://admin.yiyicareer.com/File/ClassroomBanner/25fa90fe41f23d5d4bae3c594326f965.png"
      },
      {
        id: 42,
        name: "1对4试听",
        address: "1对4试听课",
        station: "10月22日 00:00",
        number: 666,
        cover:
          "https://admin.yiyicareer.com/File/ClassroomBanner/25fa90fe41f23d5d4bae3c594326f965.png"
      },
      {
        id: 42,
        name: "1对4试听",
        address: "1对4试听课",
        station: "10月22日 00:00",
        number: 666,
        cover:
          "https://admin.yiyicareer.com/File/ClassroomBanner/25fa90fe41f23d5d4bae3c594326f965.png"
      }
    ],
    teachers: [
      {
        id: 42,
        name: "1对4试听",
        address: "1对4试听课",
        station: "10月22日 00:00",
        number: 666,
        cover:
          "https://admin.yiyicareer.com/File/ClassroomBanner/25fa90fe41f23d5d4bae3c594326f965.png"
      },
      {
        id: 42,
        name: "1对4试听",
        address: "1对4试听课",
        station: "10月22日 00:00",
        number: 666,
        cover:
          "https://admin.yiyicareer.com/File/ClassroomBanner/25fa90fe41f23d5d4bae3c594326f965.png"
      },
      {
        id: 42,
        name: "1对4试听",
        address: "1对4试听课",
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
  onShow() {
    wx.hideHomeButton();
    if (typeof this.getTabBar === "function" && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      });
    }
  },
  swiperChange: function(e) {
    this.setData({
      currentIndex: e.detail.current
    });
  },
  onHomeServiceClick(){
    wx.navigateTo({
      url: "../../parent/teacherList/index"
    });
  },
  onStoreServiceClick(){
    wx.navigateTo({
      url: "../../parent/storeList/index"
    });
  },
  onCreateStationClick(){
    wx.navigateTo({
      url: "../../parent/createStation/index"
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
