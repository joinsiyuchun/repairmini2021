import * as echarts from '../../ec-canvas/echarts';

const app = getApp()
const fetch = app.fetch

function generateOptions(title) {
  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#32C5E9", "#67E0E3"],
    series: [{
      name: 'title',
      type: 'gauge',
      detail: {
        formatter: '{value}%'
      },
      axisLine: {
        show: true,
        lineStyle: {
          width: 30,
          shadowBlur: 0,
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      data: []
    }]
  };
  return option;
}

const chartOption = generateOptions('故障率');

function initChart(_chartOption) {
  return function(canvas, width, height, dpr) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height,
      devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);
    chart.setOption(_chartOption, true);

    return chart;
  }
}

Page({
  data:{
    rate:0,
    ec: {
      onInit: initChart(chartOption)
    }
  },


  onLoad:function(options){
    fetch('dashboard/faultrate').then(
      data => {
        chartOption.series[0].data = [{
          value: data.rate,
          name: '故障率'
        }];
      }, () => {
        this.onLoad()
      })
    
    // var that = this
    // //调用应用实例的方法获取全局数据
    // app.getUserInfo( function(userInfo) {
    //   console.log(userInfo);
    //   //更新数据
    //   that.setData( {
    //     userInfo: userInfo
    //   })
    // })
      // fetch('dashboard/repairrate', {}).then(
  //   data => {
  //      = data.rate;
  //   })
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
  }
})