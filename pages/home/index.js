const app = getApp()
const fetch = app.fetch
Page({
  data: { 
    objectArray: [],
    index: 0
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    var callback = () => {
      wx.showLoading({
        title: '努力加载中',
        mask: true
      })
      fetch('user/switchhospital', {
        id: this.data.index
      }).then(data => {
        wx.hideLoading()
      }, () => {
        callback()
      })
    }
    callback()
  },
  onLoad: function (options) {
    var callback = () => {
      wx.showLoading({
        title: '努力加载中',
        mask: true
      })
      fetch('user/company').then(data => {
        wx.hideLoading()
        this.setData({
          objectArray: data
        })
      }, () => {
        callback()
      })
    }
    callback()
  }, 
 
  report: function () {
    wx.navigateTo({
      url: '/pages/createorder/list',
    })
  },
  toWorkorderList: function (e) {
    var type = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/workorder/list?type=' + type
    })
  }, 
  toWOInprogressList: function (e) {
    var type = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/workorder/inprogress/list?type=' + type
    })
  },
  toWOCompleteList: function (e) {
    var type = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/workorder/complete/list?type=' + type
    })
  },
  toWOHistory: function (e) {
    var type = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/workorder/history/list?type=' + type
    })
  },
  toBackupList: function(e) {
    var type = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/backuplist/index?type='+type
    })
  },
  toQualityorder: function (e) {
    var type = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/itemlist/index?type=' + type
    })
  },
  onShareAppMessage: function (e) {
    return {
      title: "一键维修",
      path: "pages/home/index",
      imageUrl: ''
    }
  }
  
})