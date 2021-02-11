const app = getApp()
const fetch = app.fetch
Page({
  data: {
    itemdata:[],
    itemlist:[],
    currentTab: 0
  },
  onLoad: function (options) {
     var id = options.item_id
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('item/find', {
      id: id
    }).then(data => {
      wx.hideLoading()
      this.setData({
        itemdata:data.item,
        itemlist: data.list
        })
      wx.hideLoading()
    }, () => {
      this.onload()
    })
  },
  switchNav: function (e) {
    var currenttab = e.currentTarget.id
    fetch('item/find', {
      id: this.data.itemdata.id,
      type: currenttab
    }).then(data => {
      this.setData({
        itemdata: data.item,
        itemlist: data.list
      })
      wx.hideLoading()
    }, () => {
      this.switchNav()
    })
    this.setData({
      currentTab: currenttab
    })
  },
 
  qcorder: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/qclog/index?item_id=' + id
    })
  },

})