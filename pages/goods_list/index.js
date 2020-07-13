import {request} from '../../request/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  //接口参数
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10
  },
  //总页数
  totalPages:0,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  // 获取数据
  async getGoodsList() {
    const res =await request({url:'/goods/search',data:this.QueryParams})
    this.totalPages = Math.ceil( res.total / this.QueryParams.pagesize )
    // console.log(this.totalPages)
    this.setData({
      goodsList:[...this.data.goodsList,...res.goods]
    });
    //手动关闭刷新
    wx.stopPullDownRefresh()
  },
  // 修改isActive
  handleTabsItemChange(e) {
    const { index } = e.detail
    // console.log(index)
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },
  //上拉刷新
  onReachBottom(){
    if(this.QueryParams.pagenum >= this.totalPages ){
      wx.showToast({
        title: '没有下一页了'
      });
    }else{
      this.QueryParams.pagenum++
      this.getGoodsList()
      // console.log(this.QueryParams.pagenum)
    }
  },
  //刷新页面
  onPullDownRefresh(){
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum = 1
    this.getGoodsList()
  }
})