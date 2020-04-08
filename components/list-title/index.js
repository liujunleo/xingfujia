// components/list-title/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    titleText: {
      type: String,
      value: "标题"
    },
    moreText: {
      type: String,
      value: "更多"
    },
    url: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    jump() {
      wx.navigateTo({
        url: this.data.url
      });
    }
  }
});
