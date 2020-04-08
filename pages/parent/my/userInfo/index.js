var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 上传文件列表
    fileList: [
       { url: 'https://img.yzcdn.cn/vant/leaf.jpg'}
    ],
    // 展示时间选择框
    showDatetime: false,
    // 当前操作的宝宝index
    editBabyIndex: -1,
    // 宝宝列表
    babyList:[
      {
        id: 1,
        name: '大宝',
        sex: '1',
        birthday: '2020-02-22',
      },
      {
        id: 2,
        name: '二宝',
        sex: '2',
        birthday: '2020-02-22',
      }
    ],
    // 时间选择框日期格式化
    formatter(type, value) {
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      }
      return value;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  afterRead(event) {
    const { file } = event.detail;
    console.log('event',event);
    const { fileList = [] } = this.data;
    console.log('...file',...file);
    fileList.push({ url: file.path });
    this.setData({ fileList });
    console.log('fileList',fileList);
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
      wx.showToast({ title: '请选择图片', icon: 'none' });
    } else {
      const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo${index}.png`, file));
      Promise.all(uploadTasks)
        .then(data => {
          wx.showToast({ title: '上传成功', icon: 'none' });
          const newFileList = data.map(item => { url: item.fileID });
          this.setData({ cloudPath: data, fileList: newFileList });
        })
        .catch(e => {
          wx.showToast({ title: '上传失败', icon: 'none' });
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
  onDelete(){
    this.setData({fileList: []})
  },
  onDatetimeClose(){
    this.setData({
      showDatetime: false
    });
  },
  // 宝宝名字
  onBabyNameChange(e) {
    let data = this.data.babyList;
    data[e.currentTarget.dataset.index].name = e.detail
    this.setData({
      babyList: data
    })
  },
  // 宝宝性别
  onSexChange(e){
    let data = this.data.babyList;
    data[e.currentTarget.dataset.index].sex = e.detail
    this.setData({
      babyList: data
    })
  },
  // 宝宝生日时间选择
  onShowDatetimeTap(e){
    this.setData({
      showDatetime: true,
      editBabyIndex: e.currentTarget.dataset.index
    });
  },
  // 宝宝生日时间选择确定
  onDatetimeConfirm(e) {
    let data = this.data.babyList;
    data[this.data.editBabyIndex].birthday = util.formatDate(new Date(e.detail))
    this.setData({
      showDatetime: false,
      babyList: data
    })
  },
  onBabyDeleteTap(e){
    let data = this.data.babyList;
    data.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      babyList: data
    })
  },
  onAddBabyTap(){
    let item = {
      id: new Date().getTime(),
      name: '',
      sex: '1',
      birthday: '',
    }
    let data = this.data.babyList;
    data.push(item);
    this.setData({
      babyList: data
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})