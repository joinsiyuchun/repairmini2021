const app = getApp()
const fetch = app.fetch
var defaultsn
Page({
  data: {
    incubList: [],
    type:''
  },
  onLoad: function (options) {
    var type = options.type
    this.setData({ type: type });
    console.log(type)
    var callback = () => {
      wx.showLoading({
        title: '努力加载中',
        mask: true
      })
      fetch('incubator/findbytype', { type: type }).then(data => {
        wx.hideLoading()
        this.setData({
          incubList: data.list
        })
      }, () => {
        callback()
      })
    }
    callback()
  },
  search: function (e) {
    fetch('incubator/findbyparam', {
      sn: defaultsn,
      type: this.data.type
    }).then(data => {
      this.setData({
        incubList: data.list
      })
    })
  },
  // 动态获取input输入值
  bindKeyInput: function (e) {
    defaultsn = e.detail.value
  },
  tapIncub: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/incubbacklist/index?incub_id=' + id
    })
  }

})

