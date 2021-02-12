const app = getApp()
const fetch = app.fetch

Page({
  data:{
    authorized:false
  },
  onLoad:function(options){
    this.userAuthorized();
  },
    
  
  // onShareAppMessage: function (e) {
  //   return {
  //     title: "一键维修",
  //     path: "pages/home/index",
  //     imageUrl: ''
  //   }
  // },
  getUserInfo: function (e) {
    let appget = e.detail;
    console.log(appget.userInfo.nickName)
    if(appget){
      fetch('User/nickname', {
        nickname: appget.userInfo.nickName
      }).then(
          this.setData({
            authorized:true
          })
        )
    }
  },

  userAuthorized(){
    wx.getSetting({
      success:data=>{
        if(data.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success:data=>{
              this.setData({
                authorized:true
              })
            }
          })
        }else{
          wx.showToast({
            title:'申请设备管理组，需要授权用户昵称',
            icon:'none',
            duration:1200
          })
        }
      }
    })
  }
  
})