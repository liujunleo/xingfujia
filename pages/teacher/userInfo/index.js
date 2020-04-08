Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 上传文件列表
    fileList: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},
  afterRead(event) {
    const { file } = event.detail;
    console.log("event", event);
    const { fileList = [] } = this.data;
    console.log("...file", ...file);
    fileList.push({ url: file.path });
    this.setData({ fileList });
    console.log("fileList", fileList);
    this.uploadToCloud();
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.path,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   }
    // });
  },
  // 上传图片
  uploadToCloud() {
    wx.cloud.init();
    const { fileList } = this.data;
    if (!fileList.length) {
      wx.showToast({ title: "请选择图片", icon: "none" });
    } else {
      const uploadTasks = fileList.map((file, index) =>
        this.uploadFilePromise(`my-photo${index}.png`, file)
      );
      Promise.all(uploadTasks)
        .then(data => {
          wx.showToast({ title: "上传成功", icon: "none" });
          const newFileList = data.map(item => {
            url: item.fileID;
          });
          this.setData({ cloudPath: data, fileList: newFileList });
        })
        .catch(e => {
          wx.showToast({ title: "上传失败", icon: "none" });
          console.log(e);
        });
    }
  },
  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.path
    });
  },
  onDelete() {
    this.setData({ fileList: [] });
  },
  onDatetimeClose() {
    this.setData({
      showDatetime: false
    });
  },
  onConfirmTap() {
    wx.navigateTo({
      url: "../../teacher/userInfo/skill/index"
    });
  },
  // 宝宝名字
  onBabyNameChange(e) {
    let data = this.data.babyList;
    data[e.currentTarget.dataset.index].name = e.detail;
    this.setData({
      babyList: data
    });
  },
  // 宝宝性别
  onSexChange(e) {
    let data = this.data.babyList;
    data[e.currentTarget.dataset.index].sex = e.detail;
    this.setData({
      babyList: data
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
