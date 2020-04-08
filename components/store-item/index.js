// components/course-item.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
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
    onItemTap(id) {
      wx.navigateTo({
        url: "../../parent/storeList/details"
      });
    }
  }
});
