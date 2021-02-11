const app = getApp()
const fetch = app.fetch
Page({
  data: {
    //设置当前完成步数
    Steps: 0,

    // 当步骤为五步时步骤名不可超过五个汉字
    StepsList: ["待接修", "维修中", "已完修", "已结算"],
    //步骤为五步时
    progress: 75,
    percent: 33,
    // //步骤为四步时
    //   progress: 75,
    //   percent: 33,
    // //步骤为三步时
    //   progress: 67,
    //   percent: 50,
    workorder:[]
  },
  onLoad: function(options) {
    var id = options.order_id
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('workorder/query', {
      id: id
    }).then(data => {
      this.setData({workorder:data})
      wx.hideLoading()
    }, () => {
      this.onLoad(options)
    })
  },
  onUnload: function() {
    wx.switchTab({
      url: '/pages/order/list/list'
    })
  }
})