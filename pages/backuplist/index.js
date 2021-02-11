const app = getApp()
const fetch = app.fetch
var defaultsn
Page({
  data: {
    itemList: [],
    type:''
  },
  onLoad: function (options) {
    var callback = () => {
      wx.showLoading({
        title: '努力加载中',
        mask: true
      })
      fetch('item/backuplist').then(data => {
        wx.hideLoading()
        this.setData({
          itemList: data.list
        })
      }, () => {
        callback()
      })
    }
    callback()
  },
  // 动态获取input输入值
  bindKeyInput: function (e) {
    defaultsn = e.detail.value
  },
  tapItem: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/backuplog/index?item_id=' + id
    })
  },
  borrow: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/itemtransfer/index?item_id=' + id
    })
  },

  return: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/itemreturn/index?item_id=' + id
    })
  }

})

