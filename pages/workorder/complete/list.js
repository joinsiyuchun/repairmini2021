const app = getApp()
const fetch = app.fetch
var Moment = require("../../../utils/moment.js");
Page({
  data: {
    items: [
      { id: '1', value: '维护范围内免费', checked: true },
      { id: '2', value: '维护范围内付费' },
      { id: '3', value: '维保范围外付费' },
    ],
    selected: '1',
    addShow: false, //添加输入面板是否显示
    inputFocus: false,//是否选中
    addTotal: "",//维修总金额
    addAccessary: "",//零配件金额
    addService: "",//人工服务金额
    order_id:null,
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
    workorder:[],
    date: "2020-01-01",//默认起始时间  
    date2: Moment(new Date()).format('YYYY-MM-DD'),//默认结束时间 
  },
  onLoad: function (options) {
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
      url: '/pages/workorder/complete/list?type=3'
    })
  },
  bindDateChange: function (e) {
    console.log('接修日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('workorder/querylist', {
      type: 3,
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
  bindDateChange2: function (e) {
    console.log('接修日期picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date2: e.detail.value
    })
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('workorder/querylist', {
      type: 3,
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
  refix: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.currentTarget.dataset.id)
    wx.showModal({ //提交修改提示框
      title: '返修',
      content: '确认该工单返修吗？',
      success: function (res) {
        if (res.confirm) {
          //提示框确定以后
          fetch('workorder/refix', {
            id: e.currentTarget.dataset.id
          }, 'POST').then(data => {
            wx.navigateTo({
              url: '/pages/workorder/complete/list?type=3'
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
   * 添加按钮事件
   */
  addDivShow: function (e) {
    this.setData({
      addShow: true,
      inputFocus: true,
      order_id: e.currentTarget.dataset.id
    });
  },
  //输入内容绑定至数据
  bindAddTotal: function (e) {
    this.setData({
      addTotal: e.detail.value
    })
  },
  bindAddAccessary: function (e) {
    this.setData({
      addAccessary: e.detail.value
    })
  },
  bindAddService: function (e) {
    this.setData({
      addService: e.detail.value
    })
  },
  //确定新增按钮事件
  addTodo: function (e) {
    var total = this.data.addTotal;
    var selected = this.data.selected;
    var addService = this.data.addService;
    var addAccessary = this.data.addAccessary;
    var order_id = this.data.order_id;
    if (total.trim() == "") {
      wx.showToast({
        title: '维修总金额不能为空!',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showModal({ //提交修改提示框
      title: '维修工单结算',
      content: '确定对该工单进行结算吗？',
      success: function (res) {
        if (res.confirm) {
          //提示框确定以后
          fetch('settlement/settle', {
            id: order_id,
            total: total,
            settletype: selected,
            service:addService,
            accessary:addAccessary
          }, 'POST').then(data => {
            wx.navigateTo({
              url: '/pages/workorder/complete/list?type=3'
            })
          }, () => {
            this.addTodo()
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //取消按钮事件
  cancelTodo: function () {
    this.setData({
      addShow: false,
      inputFocus: false,
      addTotal: '',
      addAccessary:'',
      selected:''
    });
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  
    this.setData({
      seleted: e.detail.value
    })
  }
})