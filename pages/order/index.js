// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"全部",
        isActive:true
      },
      {
        id:1,
        value:"待付款",
        isActive:false
      },
      {
        id:2,
        value:"代发货",
        isActive:false
      },
      {
        id:3,
        value:"退款/退货",
        isActive:false
      }
    ]
  },
  handleTabsItemChange(e) {
    let {tabs} = this.data
    const {index} = e.detail
    // console.log(index)
    tabs.forEach((v,i) =>i===index?v.isActive=true:v.isActive=false);
    this.setData({tabs})
  },
})