//Page Object
import { request } from "../../request/index.js"
Page({
  data: {
    //轮播图
    swiperList:[],
    //分类数组
    cateList:[],
    //楼层列表
    floorList:[]
  },
  //options(Object)
  onLoad: function(options){
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  //获取轮播图方法
  getSwiperList(){
    request({url:'/home/swiperdata'})
    .then(result =>{
      this.setData({
        swiperList:result
      })
    })
  },
  //获取分类方法
  getCateList(){
    request({url:'/home/catitems'})
    .then(result=>{
      this.setData({
        cateList:result
      })
    })
  },
  // 获取楼层列表
  getFloorList(){
    request({url:'/home/floordata'})
    .then(result=>{
      this.setData({
        floorList:result
      })
    })
  },
  

});