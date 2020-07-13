import { request } from "../../request/index"
Page({
  data: {
    // 左边数据
    leftMenuList: [],
    // 右边数据
    rightContent: [],
    // 当前索引
    currentIndex: 0,
    //设置吸顶
    scrollTop:0
  },
  // 接口总数据
  Cates: [],

  onLoad: function (options) {
    const Cates = wx.getStorageSync("cates");
    if (!Cates) {
      this.getCates()
    } else {
      if (Date.now() - Cates.time > 1000 * 3000) {
        this.getCates()
      }else{
        // console.log('旧数据')
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 获取数据
  getCates() {
    request({ url: '/categories' })
      .then(res => {
        this.Cates = res
        wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      })
  },
  //切换数据
  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      scrollTop:0,
      rightContent
    })
  }
})