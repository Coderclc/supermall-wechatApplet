import {
  getHomeData,
  getGoodsData
} from "../../service/index.js"

import {
  types,
  OFFSET_TOP,
} from "../../utils/js/const.js"

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
    currentType: 'pop',
    showBackTop: false,
    showTabControl: false,
    currentIndex: 0,
    tabOffsetTop:0
  },
  // ----------------------生命周期函数----------------------
  onLoad() {
    //get swiper recommend data
    this._getHomeData()
    // get goods data
    this._getGoodsData("new")
    this._getGoodsData("pop")
    this._getGoodsData("sell")

  },
  onReachBottom() {
    // 下拉加载新数据
    this._getGoodsData(this.data.currentType)
  },
  onPageScroll(c) {
    // prevent  frequency  high
    if (this.data.showBackTop != (OFFSET_TOP < c.scrollTop)) {
      this.setData({
        showBackTop: OFFSET_TOP < c.scrollTop
      })
    }
      // 1.recommend组件加载完成后获取tabControl offsetTop 
      // 2.判断显/隐位置
      // 3.同步currentIndex  
    // prevent  frequency  high
    if (this.data.showTabControl != 
      (this.data.tabOffsetTop< c.scrollTop)) {
      this.setData({
        showTabControl: this.data.tabOffsetTop< c.scrollTop
      })
    }
    // tabControl_ 为重渲染,hidden无效,currentIndex 会回到0
    if (this.data.showTabControl) {
      this.selectComponent("#tabControl")
        .setData({
          currentIndex: this.data.currentIndex
        })
      this.selectComponent("#tabControl_")
        .setData({
          currentIndex: this.data.currentIndex
        })
    }
  },
  onShareAppMessage() {},
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
  _getGoodsData(type) {
    // 1.获取 page
    const page = this.data.goods[type].page + 1
    getGoodsData(type, page)
      .then(res => {
        const list = this.data.goods[type].list
        list.push(...res.data.data.list)
        // es6拼接变量字符串
        const pageKey = `goods.${type}.page`
        const listKey = `goods.${type}.list`
        this.setData({
          [pageKey]: page,
          [listKey]: list
        })
      })
  },
  // ----------------------事件监听函数----------------------
  // native + vant  tabControl
  tabControl(event) {
    this.setData({
      currentType: types[event.detail.index],
      // record index  此时tabControl_不一定渲染,捕获不到切换不了
      currentIndex: event.detail.index
    })
  },
  // monitor recommend image load done
  recommendLoad(){
    wx.createSelectorQuery().select('#tabControl').boundingClientRect((rect) => {
      //save tabControl offsetTop
      this.setData({
        tabOffsetTop:rect.top
      })
    }).exec()
  }
})