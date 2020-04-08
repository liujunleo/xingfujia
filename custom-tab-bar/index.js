const app = getApp();

Component({
  data: {
  },
  attached() {
    console.log('attached',app.globalData.userType)
    let {selected,color, selectedColor,list} = app.globalData.userType === 1 ?app.globalData.parantTabbar:app.globalData.teacherTabbar
    this.setData({
      selected: selected,
      color: color,
      selectedColor: selectedColor,
      list: list,
    })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})