const app = getApp()
const fetch = app.fetch
Page({
  data:{
    company: {}
  },
  onLoad:function(options){
    fetch('user/company', {}).then(
      data => {
        this.setData({
          company: data
        })
      }, () => {
        this.onLoad()
      })

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  switchhospital:function(options){
    var id = options.currentTarget.dataset.id
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('user/switchhospital', {
      id: id
    }).then(data => {
      wx.hideLoading()
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }, () => {
        this.switchhospital()
    })
  }
})