import {
  app
} from "../../utils/js/const"
Page({
  data: {
    cartList: [],
    totalPrice: 0,
    allChecked:''
  },
  // ----------------------生命周期函数----------------------
  //每次进入都需要重加载全局列表
  onShow() {
    //获取添加在全局数据的cartList
    this.setData({
      cartList: app.globalData.cartList,
      allChecked:app.globalData.allChecked
    })
    //default false 有长度为true
    if(this.data.cartList.length){
      this.setData({
        allChecked:true
      })
      app.globalData.allChecked=true
    }
    this.calcTotalPrice()
  },
  // ----------------------事件监听函数----------------------
  change() {
    this.calcTotalPrice()
  },
  //计算总价
  calcTotalPrice() {
    const totalPrice = 
    app.globalData.cartList.reduce((previous, x) => {
      if(x.isCheck){
      return x.lowNowPrice * x.count + previous
      }else{
        return previous
      }
    }, 0)
    this.setData({
      totalPrice
    })
  },
  //isCheck modify allCheck
  checkAllSelected(c){
    this.setData({
      allChecked:c.detail
    })
  },
  //allCheck modify isCheck
  checkIsCheck(c){
    this.data.cartList.forEach(item=>{
      item.isCheck=c.detail
    })
    this.setData({
      cartList:this.data.cartList
    })
    this.calcTotalPrice()
  }
})