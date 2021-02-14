const app = getApp()
const fetch = app.fetch
var Moment = require("../../utils/moment.js");
// var DATE_LIST = [];
// var DATE_YEAR = new Date().getFullYear()
// var DATE_MONTH = new Date().getMonth() + 1
// var DATE_DAY = new Date().getDate()
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
    workorder: [],
    date: "2020-01-01",//默认起始时间  
    date2: Moment(new Date()).format('YYYY-MM-DD'),//默认结束时间 
    // checkInDate: ""
  },
  onLoad: function(options) {
    var type = options.type
    var curdate = Moment(new Date()).format('YYYY-MM-DD');
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('workorder/querylist', {
      type: type,
      begindate: "2020-01-01",
      enddate: curdate
    }).then(data => {
      this.setData({
        workorder: data.items
      })
      wx.hideLoading()
    }, () => {
      this.onLoad(options)
    })
  },
  onUnload: function() {
    wx.switchTab({
      url: '/pages/order/list/list'
    })
  },
  bindDateChange: function(e) {
    console.log('报修日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('workorder/querylist', {
      type: 0,
      begindate: this.data.date,
      enddate: this.data.date2
    }).then(data => {
      if (data.length === 0) {
        this.setData({
          workorder: null
        })
      } else {
        this.setData({
          workorder: data.items
        })
      }
      wx.hideLoading()
    }, () => {
      this.onLoad(options)
    })
  },
  bindDateChange2: function(e) {
    console.log('报修日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('workorder/querylist', {
      type: 0,
      begindate: this.data.date,
      enddate: this.data.date2
    }).then(data => {
      if (data.length === 0){
          this.setData({
            workorder: null
          })
      }else{
        this.setData({
          workorder: data.items
        })
    }
      wx.hideLoading()
    }, () => {
      this.onLoad(options)
    })
  },
  cancelorder: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.currentTarget.dataset.id)
    wx.showModal({ //提交修改提示框
      title: '报修单退回',
      content: '确认退回该报修单吗？',
      success: function(res) {
        if (res.confirm) {
          //提示框确定以后
          fetch('workorder/cancel', {
            id: e.currentTarget.dataset.id
          }, 'POST').then(data => {
            wx.navigateTo({
              url: '/pages/workorder/inprogress/list?type=2'
            })
          }, () => {
            this.confirm()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  acceptorder: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.currentTarget.dataset.id)
    wx.showModal({ //提交修改提示框
      title: '接修工单',
      content: '确认接修该报修单吗？',
      success: function(res) {
        if (res.confirm) {
          //提示框确定以后
          fetch('workorder/accept', {
            id: e.currentTarget.dataset.id
          }, 'POST').then(data => {
            wx.navigateTo({
              url: '/pages/workorder/inprogress/list?type=1'
            })
          }, () => {
            this.confirm()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function() {
  //   let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
  //   this.setData({
  //     checkInDate: getDate.checkInDate
  //   })
  // },
})