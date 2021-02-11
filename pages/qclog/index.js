const app = getApp()
const fetch = app.fetch
Page({
  data: {
  },
  onLoad: function (options) {
    var id = options.item_id
    console.log(id)
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('item/find', {
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
    fetch('qualitylog/confirm', {
      type: formData.type,
      result: formData.result,
      memo: formData.memo,
      location: formData.location,
      id:this.data.item.id
    }, 'POST').then(res => {
     wx.redirectTo({
       url: '/pages/qcorder/index?item_id=' + this.data.item.id,
     })
    }, () => {
      this.formSubmit()
    })

  }
})