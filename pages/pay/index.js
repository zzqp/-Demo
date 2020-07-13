import { getSetting, openSetting, chooseAddress,showModal, showToast } from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addRess:{},
    cart:[],
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const addRess = wx.getStorageSync('addRess');
    let cart = wx.getStorageSync('cart')||[];
    // const checkAll = cart.length?cart.every(v=>v.checked):false
    cart = cart.filter(v=>v.checked)
    let totalPrice=0
    let totalNum=0
    cart.forEach(v => {
        totalPrice += v.num*v.goods_price
        totalNum += v.num  
    });
   
    this.setData({
      cart,
      totalPrice,
      totalNum,
      addRess
    })
  },
  
})