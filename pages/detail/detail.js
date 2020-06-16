import Toast from "../../miniprogram_npm/@vant/weapp/toast/toast"
import {
  getDetailData,
  getDetailsRecommend
} from "../../service/detail"
import {
  goodsInformation,
  shopInformation,
  OFFSET_TOP,
  app
} from "../../utils/js/const"
import{
  formatDate
}from "../../utils/js/utils"
Page({
  data: {
    id:'',
    topImages: [],
    goodsInfo: {},
    shopInfo: {},
    detailInfo: {},
    goodsParam: {},
    commentInfo: {},
    recommend: {},
    showBackTop: false,
    offsetTop: [0],
    index: 1,
    scrollTop: null,
    sign: 0
  },
  // ----------------------生命周期函数----------------------
  onLoad(c) {
    // 获取详情页的数据
    this._getDetailData(c.id)
    //获取详情页recommend数据
    this._getDetailsRecommend()
    //savr id
    this.data.id=c.id
  },
  onPageScroll(c) {
    const sT = c.scrollTop
    // 监听滚动show/hide backTop
    if (this.data.showBackTop != (OFFSET_TOP < sT)) {
      this.setData({
        showBackTop: OFFSET_TOP < sT,
      })
    }
    // 保存scrollTop 用于定位组件
    this.setData({
      scrollTop: sT
    })
    // 监听滚动改变navBar index
    for (let i in this.data.offsetTop) {
      if (
        this.data.sign != i &&
        ((i < this.data.offsetTop.length - 1 &&
            sT >= this.data.offsetTop[i] &&
            sT < this.data.offsetTop[+i + 1]) ||
          (sT >= this.data.offsetTop[i] && i == this.data.offsetTop.length - 1))
      ) {
        // 防止频繁触发
        this.setData({
          sign: i
        })
        this.selectComponent("#c-nav-bar")
          .setData({
            currentIndex: i
          })
      }
    }
  },
  // ----------------------网络请求函数----------------------
  _getDetailData(id) {
    getDetailData(id).then(res => {
      console.log(res);
      const data = res.data.result
      //获取轮播图数据
      const topImages = data.itemInfo.topImages
      //获取商品数据集合
      const goodsInfo = new goodsInformation(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )
      //获取商铺数据集合
      const shopInfo = new shopInformation(data.shopInfo)
      // 获取商品详情细节数据
      const detailInfo = data.detailInfo
      // 获取商品参数数据
      const goodsParam = data.itemParams
      // 获取用户评论数据
      const commentInfo = data.rate.cRate!=0?data.rate.list[0]:{}
      const date =new Date(commentInfo.created*1000)
      commentInfo.created=formatDate(date,"yyyy-MM-dd")
      this.setData({
        topImages,
        goodsInfo,
        shopInfo,
        detailInfo,
        goodsParam,
        commentInfo
      })
    })
  },
  _getDetailsRecommend() {
    getDetailsRecommend()
      .then(res => {
        this.setData({
          recommend: res.data.data.list
        })
      })
  },
  // ----------------------事件监听函数----------------------
  //1.获取参数,评论,推荐offsetTop
  displayDone() {
    this.getOffsetTop('#goodsParam')
    this.getOffsetTop('#userComment')
    this.getOffsetTop('#goodsList')
  },
  //2.click navbar 跳转
  navBarClick(c) {
    wx.pageScrollTo({
      scrollTop: this.data.offsetTop[c.detail]
    })
  },
  //3.将商品加入购物车
  addToCart(){
    //3.1 获取goods info
    const product={}
    product.image=this.data.topImages[0]
    product.title=this.data.goodsInfo.title
    product.desc=this.data.detailInfo.desc
    product.lowNowPrice=this.data.goodsInfo.lowNowPrice
    product.id=this.data.id
    product.oldPrice=this.data.goodsInfo.oldPrice
    product.isCheck=true
    //3.2.1读取全局购物车列表数据
    const cartList = app.globalData.cartList
    //3.2.2 对比添加的数据是否已存在购物车
    const item=cartList.find(item=>item.id==product.id)
    if(item){
      item.count++
      Toast('当前商品的数量+1');
    }else {
      app.globalData.cartList.push(product)
      product.count=1
      Toast('加入购物车成功');
    }
  },
  // ---------------------自定义封装函数---------------------
  getOffsetTop(selector) {
    wx.createSelectorQuery().select(selector)
      .boundingClientRect((rect) => {
        // 加上滚动的距离,减去navbar的高度
        const topDistance = rect.top + this.data.scrollTop - 45
        this.data.offsetTop.splice(this.data.index, 1, topDistance)
        this.data.index++
          (this.data.index == 4) && (this.data.index = 1)
      }).exec()
  }
})