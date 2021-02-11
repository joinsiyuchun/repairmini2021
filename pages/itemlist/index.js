const app = getApp()
const fetch = app.fetch

var defaultsn
Page({
  data: {
    itemList: [],
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
      fetch('item/findbytype', { type: type }).then(data => {
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
  search: function (e) {
      fetch('item/findbyparam', { 
        sn: defaultsn,
        type:this.data.type
        }).then(data => {
        this.setData({
          itemList: data.list
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
      url: '/pages/qcorder/index?item_id=' + id
    })
  }

})

