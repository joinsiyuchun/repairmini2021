const app = getApp()
const fetch = app.fetch
Page({
  data: {
    is_last: true,
    currentIndex:0,
    order: {}
  },
  enableRefresh: false,
  last_id: 0,
  row: 10,
  onLoad: function() {
    wx.showLoading({
      title: '加载中'
    })
    this.loadData({
      last_id: 0,
      status:0,
      success: data => {
        this.setData({
          order: data.list
        }, () => {
          wx.hideLoading()
        })
      },
      fail: () => {
        this.onLoad()
      }
    })
  },
  onPullDownRefresh: function() {
    wx.showLoading({
      title: '加载中'
    })
    this.loadData({
      last_id: 0,
      success: data => {
        this.setData({
          order: data.list
        }, () => {
          wx.hideLoading()
          wx.stopPullDownRefresh()
        })
      },
      fail: () => {
        this.onLoad()
      }
    })
  },
  onReachBottom: function() {
    if (this.data.is_last) {
      return
    }
    this.loadData({
      last_id: this.last_id,
      success: data => {
        var order = this.data.order
        data.list.forEach(item => {
          order.push(item)
        })
        this.setData({
          order: order
        })
      },
      fail: () => {
        this.onReachBottom()
      }
    })
  },
  onShow: function() {
    if (this.enableRefresh) {
      this.onLoad()
      wx.pageScrollTo({
        scrollTop: 0
      })
    } else {
      this.enableRefresh = true
    }
  },
  detail: function(e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/orderdetail/detail?order_id=' + id
    })
  },
  loadData: function(options) {
    wx.showNavigationBarLoading()
    fetch('workorder/orderlist', {
      last_id: options.last_id,
      status:options.status,
      row: this.row
    }).then(data => {
      this.last_id = data.last_id
      this.setData({
        is_last: data.list.length < this.row
      }, () => {
        wx.hideNavigationBarLoading()
        options.success(data)
      })
    }, () => {
      wx.hideNavigationBarLoading()
      options.fail()
    })
  },
  //用户点击tab时调用
  titleClick: function (e) {
    wx.showLoading({
      title: '加载中'
    })
    let curindx = e.currentTarget.dataset.idx
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: curindx
    })
    this.loadData({
      last_id: 0,
      status: curindx,
      success: data => {
        this.setData({
          order: data.list
        }, () => {
          wx.hideLoading()
        })
      },
      fail: () => {
        this.onLoad()
      }
    })
  }
})