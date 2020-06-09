import {
  getHomeData,getGoodsData
} from "../../service/index.js"

const types=['pop','new','sell']

Page({
  data: {
    banners: [],
    recommends: [],
    titles: ['流行', '新款', '精选'],
    goods: {
      new: {page: 0,list: []},
      pop: {page: 0,list: []},
      sell: {page: 0,list: []}
    },
    currentType:'pop'
  },
  onLoad() {
    //get swiper recommend data
    this._getHomeData()

    // get goods data
    this._getGoodsData("new")
    this._getGoodsData("pop")
    this._getGoodsData("sell")
  },
  onReachBottom(){
    // 
    this._getGoodsData(this.data.currentType)
  },
  // ----------------------网络请求函数----------------------
  _getHomeData() {
    getHomeData()
      .then(res => {
        // get index banners and recommends data
        this.setData({
          banners: res.data.data.banner.list,
          recommends: res.data.data.recommend.list
        })
      })
  },
  _getGoodsData(type){
    // 1.获取 page
    const page = this.data.goods[type].page+1
    getGoodsData(type,page)
    .then(res=>{
      const list = this.data.goods[type].list
      list.push(...res.data.data.list)
      // es6拼接变量字符串
      const pageKey = `goods.${type}.page`
      const listKey = `goods.${type}.list`
      this.setData({
        [pageKey]:page,
        [listKey]:list
      })
    })
  },
  // ----------------------事件监听函数----------------------
  // native + vant  tabControl
  tabControl(event) {
    this.setData({
      currentType:types[event.detail.index]
    })
  },
  onShareAppMessage() {}
})