const app = getApp()
const fetch = app.fetch
Page({

  data: {
    gender: '',
    username: ''
  },

  onLoad: function () {
   
    fetch('user/detail',{}).then(
      data => {
        this.setData({
          username: data.user_name,
          gender: data.gender
        })
    }, () => {
      this.onLoad()
    })
   
  },
  jump: function(e) {
    // 跳转到“个人资料修改页”
    wx.navigateTo({
      // 为了避免用户名中的特殊字符破坏字符串结构，使用encodeURIComponent()编码
      url: '/pages/modify/modify?username=' + encodeURIComponent(this.data.username) + '&gender=' + encodeURIComponent(this.data.gender)
    })
  }
})