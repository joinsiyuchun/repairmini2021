const app = getApp()
const fetch = app.fetch
Page({
  data: {
  },
  onLoad: function (options) {
    var id = options.item_id
   
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('item/query', {
      id: id
    }).then(data => {
      this.setData(data)
      console.log(data)
      wx.hideLoading()
    }, () => {
      onLoad()
    })
  },
  formSubmit: function (e) {
    // 表单返回的所有数据
    var formData = e.detail.value
    fetch('item/borrow', {
      loaner: formData.loaner,
      health: formData.health,
      memo: formData.memo,
      id:this.data.data.id
    }, 'POST').then(res => {
      wx.navigateTo({
        url: '/pages/backuplog/index?item_id=' + this.data.data.id
     })
    }, () => {
      this.formSubmit()
    })

  }
})