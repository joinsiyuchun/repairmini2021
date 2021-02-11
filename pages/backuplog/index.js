const app = getApp()
const fetch = app.fetch
Page({
  data: {
    itemlist:[],
    currentTab: 2,
    item_id:0
  },
  onLoad: function (options) {
    var id = options.item_id
    this.setData({
      item_id: id
    })
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('item/findtransferlog', {
      id: id,
      type:2
    }).then(data => {
      this.setData({
        itemlist: data.list
        })
      wx.hideLoading()
    }, () => {
      this.onload()
    })
  },
  switchNav: function (e) {
    var currenttab = e.currentTarget.id
    fetch('item/findtransferlog', {
      id: this.data.item_id,
      type: currenttab
    }).then(data => {
      this.setData({
        itemlist: data.list
      })
      wx.hideLoading()
    }, () => {
      this.switchNav()
    })
    this.setData({
      currentTab: currenttab
    })
  }
 
 
})