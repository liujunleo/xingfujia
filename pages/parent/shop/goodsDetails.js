const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    detail: {},
    skuPrice: null,
    goodsNumber: 1,
    totalMoney: 0,
    // 1自提 2中心使用
    orderType: "1",
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
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      id: options.id || "6"
    });
    this.getData();
  },
  getData() {
    app
      .get(`/ptmk/ptmkgoods/info/${this.data.id}`)
      .then(res => {
        res.data.specificationList.map(item => {
          item.list.map(c => {
            c.checked = false;
          });
        });
        this.setData({
          detail: res.data,
          totalMoney: res.data.preferentialPrice
        });
      })
      .catch(res => {
        console.log("res", res);
      });
  },
  // 订单类型
  onOrderTypeChange(e) {
    this.setData({
      orderType: e.currentTarget.dataset.type
    });
  },
  // 规格属性点击
  onItemTap(e) {
    const index = e.currentTarget.dataset.index;
    const cIndex = e.currentTarget.dataset.cindex;
    const id = e.currentTarget.dataset.id;
    let specificationList = this.data.detail.specificationList;
    specificationList[index].list.map(item => {
      item.checked = false;
    });
    specificationList[index].list[cIndex].checked = true;
    this.setData({
      detail: this.data.detail
    });
    this.getPrice(false);
  },
  // 获取规格属性价格
  getPrice(isSubmit = true) {
    const listLength = this.data.detail.specificationList.length;
    let key = "";
    let count = 0;
    for (let i = 0; i < listLength; i++) {
      const item = this.data.detail.specificationList[i];
      const findItem = item.list.find(f => f.checked === true);
      if (findItem) {
        count += 1;
        key += `${item.name}:${findItem.name}`;
        key += i === listLength - 1 ? "" : ";";
      }
      if (isSubmit && count === 0) {
        app.info(`请选择${item.name}`);
        break;
      }
      if (count === listLength && i === listLength - 1) {
        if (this.data.detail.openSku) {
          const findKey = this.data.detail.skuList.find(s => s.token === key);
          const totalMoney = this.data.goodsNumber * findKey.price;
          this.setData({
            skuPrice: findKey.price,
            totalMoney
          });
        }
      }
    }
  },
  // 加入购物车
  onCart() {
    this.getPrice();
  },
  // 立即下单
  onBuy() {
    this.getPrice();
  },
  swiperChange: function(e) {
    this.setData({
      currentIndex: e.detail.current
    });
  },
  onNumberChange(event) {
    const price = this.data.skuPrice || this.data.detail.preferentialPrice;
    this.setData({
      goodsNumber: event.detail,
      totalMoney: event.detail * price
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
