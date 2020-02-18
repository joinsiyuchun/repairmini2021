const app = getApp()
const fetch = app.fetch
function initSubMenuDisplay() {
  return ['hidden', 'hidden', 'hidden', 'hidden', 'hidden', 'hidden'];
}
var defaultsn
Page({
  data: {
    incubList: [],
    subMenuDispaly:initSubMenuDisplay(),
    currentTab:-1,
    currentOpt:-1,
    type:''
  },
  tapMainMenu: function (e) {
    console.log(e);
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    var newSubMenuDisplay = initSubMenuDisplay();
    if (this.data.subMenuDispaly[index] == 'hidden') {
      newSubMenuDisplay[index] = 'show';
      this.setData({ currentTab: index, currentOpt: -1 });
    } else {
      newSubMenuDisplay[index] = 'hidden';
      this.setData({ currentTab: -1, currentOpt: -1});
    }
    this.setData({ subMenuDispaly: newSubMenuDisplay });
  },
  tapSecMenu: function (e) {
    console.log(e);
    var index = parseInt(e.currentTarget.dataset.index);
    console.log(index);
    this.setData({ currentOpt: index });
    this.search();
  },
  onLoad: function (options) {
    var type = options.type
    this.setData({ type: type });
    console.log(type)
    var callback = () => {
      wx.showLoading({
        title: '努力加载中',
        mask: true
      })
      fetch('incubator/findbytype', { type: type }).then(data => {
        wx.hideLoading()
        this.setData({
          incubList: data.list
        })
      }, () => {
        callback()
      })
    }
    callback()
  },
  search: function (e) {
      fetch('incubator/findbyparam', { 
        sn: defaultsn,
        type:this.data.type,
        department: this.data.currentTab,
        product: this.data.currentOpt
        }).then(data => {
        this.setData({
          incubList: data.list
        })
      })
  },
  // 动态获取input输入值
  bindKeyInput: function (e) {
    defaultsn = e.detail.value
  },
  tapIncub: function (e) {
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/incublist/index?incub_id=' + id
    })
  }

})

