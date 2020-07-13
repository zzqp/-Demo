import { getSetting, openSetting, chooseAddress,showModal, showToast } from '../../utils/asyncWx'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addRess:{},
    cart:[],
    checkAll:false,
    totalPrice:0,
    totalNum:0
  },
  onShow(){
    const addRess = wx.getStorageSync('addRess');
    const cart = wx.getStorageSync('cart')||[];
    // const checkAll = cart.length?cart.every(v=>v.checked):false
    this.setData({
      addRess
    })
    this.setCart(cart)
  },
  //获取地址
  async handleChooseAddress() {
    try {
      const result1 = await getSetting()
      const scopeAddress = result1.authSetting['scope.address']
      if (scopeAddress === false) await openSetting()
      let addRess = await chooseAddress()
      // console.log(result3)
      addRess.all = addRess.provinceName+addRess.cityName+addRess.countyName+addRess.detailInfo
      wx.setStorageSync('addRess', addRess);
    } catch (error) {
      console.log(error)
    }
  },
  handleItemChange(e){
    // console.log(e.currentTarget.dataset.id)
    const currentIndex = e.currentTarget.dataset.id
    const {cart} = this.data
    const index = cart.findIndex(v=>v.goods_id === currentIndex)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  setCart(cart){
    let checkAll = true
    let totalPrice=0
    let totalNum=0
    cart.forEach(v => {
      if(v.checked){
        totalPrice += v.num*v.goods_price
        totalNum += v.num
      }else{
        checkAll=false
      }
    });
    checkAll = cart.length!=0?checkAll:checkAll=false
    this.setData({
      cart,
      checkAll,
      totalPrice,
      totalNum
    })
    wx.setStorageSync('cart', cart);
  },
  handleItemCheckAll(){
    let {cart,checkAll} = this.data
    checkAll = !checkAll
    cart.forEach(v=>v.checked=checkAll);
    // console.log(checkAll)
    this.setCart(cart)
  },
  async handleItemNumEdit(e){
    const {id,operation} = e.currentTarget.dataset
    console.log(id,operation)
    let {cart} = this.data
    const index =  cart.findIndex(v=>v.goods_id === id)
    if(cart[index].num===1 && operation=== -1){
      const res =await showModal({content:'您是否删除'})
      if(res.confirm){
        cart.splice(index,1)
        this.setCart(cart)
      }
    }else{
      cart[index].num+=operation
      this.setCart(cart)
    }
    
  },
  async handlePay(){
    const {addRess,totalNum} = this.data
    if(!addRess.userName) return await showToast({title:'请先添加地址'}) 
    if(totalNum===0) return await showToast({title:'请先添加商品'})
    wx.navigateTo({
      url: '/pages/pay/index'
    }); 
  }
})