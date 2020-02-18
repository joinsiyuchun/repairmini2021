const app = getApp()
const fetch = app.fetch
Page({
  data: {
    incub:[],
    incublist:[],
    currentTab: 0
  },
  onLoad: function (options) {
     var id = options.incub_id
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('incubator/findloanorder', {
      id: id
    }).then(data => {
      this.setData({
        incub:data.item,
        incublist: data.item.incub_loanorder
        })
      wx.hideLoading()
    }, () => {
      this.onload()
    })
  },
  switchNav: function (e) {
    var currenttab = e.currentTarget.id
    fetch('incubator/findloanorder', {
      id: this.data.incub.id,
      type: currenttab
    }).then(data => {
      this.setData({
        incub: data.item,
        incublist: data.list
      })
      wx.hideLoading()
    }, () => {
      this.switchNav()
    })
    this.setData({
      currentTab: currenttab
    })
  },
 
  borrow: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/incubtransfer/index?incub_id=' + id
    })
  },

  return: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/incubreturn/index?incub_id=' + id
    })
  }
})