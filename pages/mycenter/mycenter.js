var app = getApp()
Page({
  data:{
     userInfo: {}
  },
  onLoad:function(options){
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo( function(userInfo) {
    //   console.log(userInfo);
    //   //更新数据
    //   that.setData( {
    //     userInfo: userInfo
    //   })
    // })
  },
  grabTicket:function(){
    wx.navigateTo({
      url: '../grabticket/grabticket'
    })
  },
  tomyInfo: function () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  },
  toInvite: function () {
    wx.navigateTo({
      url: '../order2/order'
    })
  } ,
  callservice: function (e) {
    // 调用拨打电话API
    wx.makePhoneCall({
      phoneNumber: '400-321'   // 该电话号码为模拟数据
    })
  },
  toPaymentList: function (e) {
    var type = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/order/payment/list?type=' + type
    })
  }
})