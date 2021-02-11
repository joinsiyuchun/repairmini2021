const app = getApp()
const fetch = app.fetch
var categoryHeight = [] // 右列表各分类高度数组
Page({
  data: {
    activeIndex: 0,
    tapIndex: 0,
    itemList: [],
    currentTab: 0
  },
  changingCategory: false, // 是否正在切换左侧激活的分类（防止滚动过快时切换迟缓）
  shopcartAnimate: null,
  onLoad: function(options) {
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('Catagory/catagorylistbyorg').then(data => {
      wx.hideLoading()
      for (var i in data.list) {
        this.setData({
          activeIndex: i
        })
        break
      }
      this.setData({
        itemList: data.list
      }, () => {
        var query = wx.createSelectorQuery()
        var top = 0
        query.select('.item').boundingClientRect(rect => {
          top = rect.top
        })
        query.selectAll('.item-category').boundingClientRect(res => {
          res.forEach(rect => {
            categoryHeight[rect.id.substring(rect.id.indexOf('_') + 1)] = rect.top - top
          })
        })
        query.exec()
      })
    }, () => {
      this.onLoad()
    })
  },
  switchNav: function (e) {
    var currenttab = e.currentTarget.id
    wx.showLoading({
      title: '努力加载中'
    })
    fetch('food/list', {
      department: currenttab
    }).then(data => {
      wx.hideLoading()
      for (var i in data.list) {
        this.setData({
          activeIndex: i
        })
        break
      }
      this.setData({
        foodList: data.list,
        promotion: data.promotion[0]
      }, () => {
        var query = wx.createSelectorQuery()
        var top = 0
        query.select('.item').boundingClientRect(rect => {
          top = rect.top
        })
        query.selectAll('.item-category').boundingClientRect(res => {
          res.forEach(rect => {
            categoryHeight[rect.id.substring(rect.id.indexOf('_') + 1)] = rect.top - top
          })
        })
        query.exec()
      })
    }, () => {
      this.switchNav()
    })
    this.setData({
      currentTab: currenttab
    })
  },
  tapCategory: function(e) {
    var index = e.currentTarget.dataset.index
    this.changingCategory = true
    this.setData({
      activeIndex: index,
      tapIndex: index
    }, () => {
      this.changingCategory = false
    })
  },
  onItemScroll: function(e) {
    var scrollTop = e.detail.scrollTop
    var activeIndex = 0
    categoryHeight.forEach((item, i) => {
      if (scrollTop >= item) {
        activeIndex = i
      }
    })
    if (!this.changingCategory) {
      this.changingCategory = true
      this.setData({
        activeIndex: activeIndex,
      }, () => {
        this.changingCategory = false
      })
    }
  },
  scrolltolower: function() {
    this.setData({
      activeIndex: categoryHeight.length - 1
    })
  },
 
  itemlist: function(e) {
      var category_id = e.currentTarget.dataset.cid
      var department_id = e.currentTarget.dataset.did
      wx.navigateTo({
        url: '/pages/checkout/checkout?category_id=' + category_id + '&department_id=' + department_id
      })
  }
})
