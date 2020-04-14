var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    searchText: "",
    page: 1,
    limit: 8,
    total: 0,
    list: [],
    typeList: [],
    categoryId: ""
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
    this.getList();
    this.getTypeList();
  },
  onTabsChange(e) {
    this.setData({
      activeKey: e.detail.name,
      page: 1,
      searchText: "",
      categoryId: ""
    });
    this.getList();
    this.getTypeList();
  },
  // 触底事件
  onReachBottom: function() {
    const list = this.data.activeKey === 0 ? this.data.list : this.data.serviceList;
    if (list.length == this.data.total) {
      return;
    }
    this.setData(
      {
        page: this.data.page + 1
      },
      _ => {
        this.getList();
      }
    );
  },
  onSearch(e) {
    const value = e ? e.detail : this.data.searchText;
    this.setData({
      page: 1,
      searchText: value
    });
    this.getList();
  },
  getTypeList() {
    const url = this.data.activeKey === 0 ? "/ptmk/ptmkgoodscategory/list" : "/ptmk/ptmkservercategory/list";
    app
      .post(url)
      .then(res => {
        this.setData({
          typeList: res.data
        });
      })
      .catch(res => {
        console.log("res", res);
      });
  },
  getList() {
    const params = {
      categoryId: this.data.categoryId,
      limit: this.data.limit,
      name: this.data.searchText,
      page: this.data.page
    };
    const url = this.data.activeKey === 0 ? "/ptmk/ptmkgoods/list" : "/ptmk/ptmkserver/list";
    app.loading();
    app
      .post(url, params)
      .then(res => {
        let list = this.data.list;
        if (this.data.page == 1) {
          this.setData({ list: res.data.list, total: res.data.totalCount });
        } else {
          list = list.concat(res.data.list || []);
          this.setData({ list: list, total: res.data.totalCount });
        }
        app.hideLoading();
      })
      .catch(res => {
        console.log("res", res);
        app.hideLoading();
      });
  },
  onChange(event) {
    const item = this.data.typeList[event.detail - 1];
    this.setData({
      categoryId: item ? item.id : ""
    });
    this.onSearch();
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
