const app = getApp()
const fetch = app.fetch
Page({
  data: {
    itemList: [],
    comment:"",
    location: ""
  },
  onLoad: function(options) {
    var category_id = options.category_id
    var department_id = options.department_id
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('item/listbycategory', {
      category_id: category_id,
      department_id: department_id
    }).then(data => {
      this.setData({
        itemList: data.data
      })
      wx.hideLoading()
    }, () => {
      this.onLoad(options)
    })
  },
  comment: function(e) {
    this.data.comment = e.detail.value
  },
  itempage: function (e) {
    var item_id = e.currentTarget.dataset.itemid
    wx.navigateTo({
      url: '/pages/itempage/index?item_id=' + item_id
    })
  },
  location: function (e) {
    this.data.location = e.detail.value
  },
  confirm: function() {
    var id = this.data.item_id
    wx.showLoading({
      title: '正在报修'
    })
    fetch('workorder/confirmorder', {
      id: id,
      comment: this.data.comment,
      location: this.data.location
    }, 'POST').then(data => {
      wx.navigateTo({
        url: '/pages/order/detail/detail?order_id=' + data
      })
    }, () => {
      this.confirm()
    })
  },
  formSubmit: function (e) {
   
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.showModal({ //提交修改提示框
      title: '提交报修',
      content: '',
      success: function (res) {
        console.log('用户提交')
        if (res.confirm) {
          //提示框确定以后
          fetch('workorder/confirm', {
            formdata: e.detail.value
          }, 'POST').then(data => {
            wx.navigateTo({
              url: '/pages/orderdetail/detail?order_id=' + data
            })
          }, () => {
            this.confirm()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  }
})