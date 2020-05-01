var app = getApp();
Page({
  data: {
    page: 1,
    limit: 8,
    total: 0,
    list: [],
    checkAll: false,
    startX: 0,
    startY: 0,
    cartList: [
      {
        id: 1,
        name: "哈佛外教百",
        imageUrl: "/assets/images/ban.jpg",
        price: 99.99,
        discount: 99.99,
        isTouchMove: false,
        selected: false,
        number: 2
      },
      {
        id: 1,
        name: "哈佛外教百科英语3天课程包哈佛外教百科英语3天课程包哈佛外教百科英语3天课程包哈佛外教百科英语3天课程包",
        imageUrl: "/assets/images/ban.jpg",
        price: 299.99,
        discount: 99.99,
        isTouchMove: false,
        selected: false,
        number: 1
      },
      {
        id: 2,
        name: "哈佛外教百",
        imageUrl: "/assets/images/ban.jpg",
        price: 199.99,
        discount: 99.99,
        isTouchMove: false,
        selected: false,
        number: 1
      }
    ]
    // cartList:[]
  },
  onLoad: function() {
    const params = {
      categoryId: this.data.categoryId,
      limit: this.data.limit,
      name: this.data.searchText,
      page: this.data.page
    };
    app
      .post(`jzmk/jzmkcart/list`,parmas)
      .then(res => {
        debugger;
      })
      .catch(res => {
        console.log("res", res);
      });
  },
  onShow: function() {
    // // 获取缓存里的购物车信息
    // var cartList = wx.getStorageSync("cartList")
    // console.log('cartList', cartList)
    // this.setData({
    //   cartList: cartList
    // })
    this.getsumTotal();
  },
  // 手指触摸动作开始 记录起点X坐标
  touchstart: function(e) {
    console.log("touchstart");
    // 开始触摸时 重置所有删除
    this.data.cartList.forEach(function(item, i) {
      // 只操作为true的
      if (item.isTouchMove) item.isTouchMove = false;
    });
    this.setData({
      startX: e.changedTouches[0].clientX,
      startY: e.changedTouches[0].clientY,
      cartList: this.data.cartList
    });
  },
  // 滑动事件处理
  touchmove: function(e) {
    console.log("touchmove");
    var that = this,
      // 当前索引
      index = e.currentTarget.dataset.index,
      // 开始X坐标
      startX = that.data.startX,
      // 开始Y坐标
      startY = that.data.startY,
      // 滑动变化坐标
      touchMoveX = e.changedTouches[0].clientX,
      // 滑动变化坐标
      touchMoveY = e.changedTouches[0].clientY,
      // 获取滑动角度
      angle = that.angle(
        {
          X: startX,
          Y: startY
        },
        {
          X: touchMoveX,
          Y: touchMoveY
        }
      );
    that.data.cartList.forEach(function(v, i) {
      v.isTouchMove = false;
      //滑动超过30度角 return
      if (Math.abs(angle) > 30) return;
      if (i == index) {
        // 右滑
        if (touchMoveX > startX) v.isTouchMove = false;
        // 左滑
        else v.isTouchMove = true;
      }
    });
    //更新数据
    that.setData({
      cartList: that.data.cartList
    });
  },
  /**
   * 计算滑动角度
   * @param {Object} start 起点坐标
   * @param {Object} end 终点坐标
   */
  angle: function(start, end) {
    var _X = end.X - start.X,
      _Y = end.Y - start.Y;
    //返回角度 /Math.atan()返回数字的反正切值
    return (360 * Math.atan(_Y / _X)) / (2 * Math.PI);
  },

  // 删除事件
  del: function(e) {
    this.data.cartList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      cartList: this.data.cartList
    });
  },

  // 选择
  select: function(e) {
    var checkAll = this.data.checkAll;
    checkAll = !checkAll;
    var cartList = this.data.cartList;

    for (var i = 0; i < cartList.length; i++) {
      cartList[i].selected = checkAll;
    }

    this.setData({
      cartList: cartList,
      checkAll: checkAll
    });
    this.getsumTotal();
  },
  // 减数量
  add: function(e) {
    // 获取购物车列表
    var cartList = this.data.cartList;
    // 获取当前点击事件的下标索引
    var index = e.currentTarget.dataset.index;
    // 获取购物车里面的number值
    var number = cartList[index].number;

    number++;
    cartList[index].number = number;
    this.setData({
      cartList: cartList
    });
    this.getsumTotal();
    // 存缓存
    wx.setStorageSync("cartList", cartList);
  },

  // 减数量
  reduce: function(e) {
    // 获取购物车列表
    var cartList = this.data.cartList;
    // 获取当前点击事件的下标索引
    var index = e.currentTarget.dataset.index;
    // 获取购物车里面的number值
    var number = cartList[index].number;

    if (number == 1) {
      number--;
      cartList[index].number = 1;
    } else {
      number--;
      cartList[index].number = number;
    }
    this.setData({
      cartList: cartList
    });
    this.getsumTotal();
    wx.setStorageSync("cartList", cartList);
  },

  // 选择
  selectedCart: function(e) {
    // 获取购物车列表
    var cartList = this.data.cartList;
    // 获取当前点击事件的下标索引
    var index = e.currentTarget.dataset.index;
    // 获取购物车里面的number值
    var selected = cartList[index].selected;

    //取反
    cartList[index].selected = !selected;
    this.setData({
      cartList: cartList
    });
    this.getsumTotal();
    wx.setStorageSync("cartList", cartList);
  },

  // 删除
  delete: function(e) {
    // 获取购物车列表
    var cartList = this.data.cartList;
    // 获取当前点击事件的下标索引
    var index = e.currentTarget.dataset.index;
    cartList.splice(index, 1);
    this.setData({
      cartList: cartList
    });
    this.getsumTotal();
    wx.setStorageSync("cartList", cartList);
  },

  settlementTap(e) {
    console.log("结算", this.data.total);
  },

  // 合计
  getsumTotal: function() {
    var sum = 0;
    for (var i = 0; i < this.data.cartList.length; i++) {
      if (this.data.cartList[i].selected) {
        sum += this.data.cartList[i].number * this.data.cartList[i].price;
      }
    }
    // 更新数据
    this.setData({
      total: sum
    });
  }
});
