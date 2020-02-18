const app = getApp()
const fetch = app.fetch

Page({
  data: {
    username: '',
    gender: ''
  },
  onLoad: function(options) {
    this.setData({
      // 收到数据后使用decodeURIComponent()解码
      username: decodeURIComponent(options.username),
      gender: decodeURIComponent(options.gender)
    })
  },
  formSubmit: function(e) {
    // 表单返回的所有数据
    var formData = e.detail.value
    // wx.showLoading({
    //   title: '正在生成订单'
    // })
    fetch('user/update', {
      username: formData.username,
      gender: formData.gender
    }, 'POST').then(data => {
      // 获取上一个页面的对象
      var pages = getCurrentPages()
      var prevPage = pages[pages.length - 2]
      // 调用上一个页面的 setData() 方法，把数据存到上一个页面中去
      prevPage.setData({
        username: formData.username,
        gender: formData.gender
      })
      // 返回到上一个页面
      wx.navigateBack()
    }, () => {
      this.formSubmit()
    })
   
  }
})