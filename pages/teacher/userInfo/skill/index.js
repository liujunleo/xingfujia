// pages/teacher/userInfo/skill/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    result: ["a", "b"],
    skillList: [
      {
        id: 1,
        name: "语言能力",
        checkedSkills: ["俄语"],
        skills: [
          { id: 11, name: "粤语" },
          { id: 12, name: "普通话（国语）" },
          { id: 13, name: "客家话" },
          { id: 14, name: "潮州话" },
          { id: 15, name: "英语" },
          { id: 16, name: "法语" },
          { id: 17, name: "俄语" },
          { id: 18, name: "日语" }
        ]
      },
      {
        id: 2,
        name: "烹饪能力",
        checkedSkills: [],
        skills: [
          { id: 11, name: "面食" },
          { id: 12, name: "粤菜" },
          { id: 13, name: "家乡菜" },
          { id: 14, name: "川菜" },
          { id: 15, name: "点心" },
          { id: 16, name: "月子餐" },
          { id: 17, name: "老人膳食" },
          { id: 18, name: "湘菜" }
        ]
      },
      {
        id: 3,
        name: "家用电器",
        checkedSkills: [],
        skills: [
          { id: 11, name: "电磁炉" },
          { id: 12, name: "电饭煲" },
          { id: 13, name: "煤气灶" },
          { id: 14, name: "电冰箱" },
          { id: 15, name: "熨烫机" },
          { id: 16, name: "微波炉" },
          { id: 17, name: "消毒柜" },
          { id: 18, name: "洗衣机" }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  // 复选框onChange
  onChange(e) {
    console.log("e", e.detail);
    let data = this.data.skillList;
    data[e.currentTarget.dataset.index].checkedSkills = e.detail;
    console.log("data", data);
    this.setData({
      skillList: data
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
