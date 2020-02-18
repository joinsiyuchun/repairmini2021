const app = getApp()
const fetch = app.fetch
Page({
  data: {
    // swiper: [],
    // category: []
  },
  onLoad: function (options) {
    // var callback = () => {
    //   wx.showLoading({
    //     title: '努力加载中',
    //     mask: true
    //   })
    //   fetch('food/index').then(data => {
    //     wx.hideLoading()
    //     // this.setData({
    //     //   swiper: data.img_swiper,
    //     //   category: data.img_category
    //     // })
    //   }, () => {
    //     callback()
    //   })
    // }
    // if (app.userInfoReady) {
    //   callback()
    // } else {
    //   app.userInfoReadyCallback = callback
    // }
  }, 
 
  start: function () {
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },
  toIncubList: function (e) {
    var type = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/incubator/index?type=' + type
    })
  }, 
  toBackIncubList: function(e) {
    var type = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/incubback/index?type=' + type
    })
  },
  onShareAppMessage: function (e) {
    return {
      title: "一键维修",
      path: "pages/index/index",
      imageUrl: ''
    }
  }
  
})