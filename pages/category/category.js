import {
  OFFSET_TOP,
  types
} from "../../utils/js/const"
import {
  getCategoryMenu,
  getSubcategory,
  getSubcategoryDetail
}
from "../../service/category"
Page({
  data: {
    categories: [],
    subcategories: [],
    maitKey: '',
    miniWallkey: '',
    titles: ['综合', '新品', '销量'],
    showBackTop: false,
    backTop: 0,
    currentType: "pop",
    goods: {
      pop: {
        list: []
      },
      new: {
        list: []
      },
      sell: {
        list: []
      }
    }
  },
  // ----------------------生命周期函数----------------------
  onLoad() {
    //请求分类菜单数据
    this._getCategoryMenu()
  },
  // ----------------------网络请求函数----------------------
  //请求分类菜单数据
  _getCategoryMenu() {
    getCategoryMenu()
      .then(res => {
        const categories = res.data.data.category.list
        const maitKey = categories[0].maitKey
        const miniWallkey = categories[0].miniWallkey
        this.setData({
          categories,
          maitKey,
          miniWallkey
        })
        //获取右边数据
        this.getRightData(maitKey,miniWallkey)
      })
  },
  //请求分类菜单子数据
  _getSubcategory(maitKey) {
    getSubcategory(maitKey)
      .then(res => {
        const subcategories = res.data.data.list
        this.setData({
          subcategories
        })
      })
  },
  _getSubcategoryDetail(miniWallkey, type) {
    getSubcategoryDetail(miniWallkey, type)
      .then(res => {
        const goodsKey = `goods.${type}.list`
        this.setData({
          [goodsKey]: res.data
        })
      })
  },
  // ----------------------事件监听函数----------------------
  sideBarClick(c) {
    const index = c.detail
    const maitKey = this.data.categories[index].maitKey
    const miniWallkey = this.data.categories[index].miniWallkey
    //切换时重新请求数据
    this.getRightData(maitKey,miniWallkey)
  },
  onScroll(c) {
    const sT = c.detail.scrollTop
    // 监听滚动show/hide backTop
    if (this.data.showBackTop != (OFFSET_TOP < sT)) {
      this.setData({
        showBackTop: OFFSET_TOP < sT,
      })
    }
  },
  // 监听backTopClick 修改scrollView scroll-top attr回到顶部
  backTopClick() {
    this.setData({
      backTop: 0
    })
  },
  // 监听tabControl点击切换
  tabControl(c) {
    const currentType = types[c.detail.index]
    this.setData({
      currentType
    })
  },
  getRightData(maitKey,miniWallkey) {
    this._getSubcategory(maitKey)
    this._getSubcategoryDetail(miniWallkey, 'pop')
    this._getSubcategoryDetail(miniWallkey, 'new')
    this._getSubcategoryDetail(miniWallkey, 'sell')
  }
})