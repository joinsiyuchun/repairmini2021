const app = getApp()
const fetch = app.fetch
Page({
  data: {
    no: null, // 运单号
    company: [1,2], // 传递给查询接口的值
    com: [], // 用于显示在页面中的医院名称
    index: 0 // 用户选择的医院的数组索引
  },
  onLoad: function (options) {
    fetch('user/companylist', {}).then(
      data => {
        this.setData({
          com: data.org_name,
          company: data.org_id
        })
      }, () => {
        this.onLoad()
      })

  },
  verify: function() {
    wx.showLoading({
      title: '提交中',
    })
    fetch('user/verify', {
      com: this.data.company[this.data.index],
      no: this.data.no
    }, 'POST').then(data => {
        wx.hideLoading()
      wx.showModal({
        title: data.msg,
        confirmText: '确认',
        success: res => {
         
        }
      })
    }, () => {
      this.verify()
    })
  },
  // 获取验证码的值
  noInput: function(e) {
    this.setData({
      no: e.detail.value
    })
  },
  // 获取医院的索引
  companyInput: function(e) {
    this.setData({
      index: e.detail.value
    })
  }
})