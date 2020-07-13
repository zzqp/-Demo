import {request} from '../../request/index'
Page({

  data: {
    goodsObj:{}
  },
  GoodsInfo:{},
  onLoad: function (options) {
    const {goods_id} = options
    // console.log(goods_id)
    this.getGoodsDetail(goods_id)
  },
  // 请求数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:'/goods/detail',data:{goods_id}})
    this.GoodsInfo = goodsObj
    // console.log(this.GoodsInfo)
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      }
    })
  },
  //放大图片
  handlePrevewImage(e){
    const urls = this.GoodsInfo.pics.map(v=> v.pics_mid)
    // console.log(e.currentTarget.dataset.pics)
    const current = e.currentTarget.dataset.pics
    wx.previewImage({
      current,
      urls
    });
  },
  // 添加购物车
  handleCartAdd(){
    let cart = wx.getStorageSync('cart') || [];
    const index = cart.findIndex(v=>v.goods_id === this.GoodsInfo.goods_id)
    if(index === -1){
      this.GoodsInfo.num=1
      this.GoodsInfo.checked=true
      cart.push(this.GoodsInfo)
    }else{
      cart[index].num++
    }
    wx.setStorageSync('cart',cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true
    })
  }
})