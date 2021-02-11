const app = getApp()
const fetch = app.fetch
var defaultsn
Page({
  data: {
    itemList:[],
    itemdata:'',
    itemid:null,
    isShowScale: true,
    isShowCompass: true,
    isShowPosition: true,
    location:null
  },
  onLoad: function (options) {
    var item_id = options.item_id
    fetch('item/itempage', {
      id: item_id
    }).then(data => {
      this.setData({
        itemList: data.list,
        itemdata:data.itemdata,
        itemid:item_id,
        location:data.itemdata.lbs
      })
    }, () => {
      this.onLoad(options)
    })

    ////////////////////
    if(!location){
      wx.getLocation({
        type: 'gcj02',
        success: (res) => {
          const { name, latitude, longitude } = res;
          this.setData({
            location: {
              name,
              latitude,
              longitude
            }
          });
        }
      });
    }
    
  },
  onChooseLocation() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          location: res
        });
        fetch('item/updatelocation', {
          id: this.data.itemid,
          location: res.name,
          latitude:res.latitude,
          longitude:res.longitude
        });
      }
    });
  }
})

