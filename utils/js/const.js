const types=['pop','new','sell']
const OFFSET_TOP = 1000
const app = getApp()

// 详情页商品数据集合
class goodsInformation {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.price = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discountDesc = itemInfo.discountDesc;
    this.lowNowPrice=itemInfo.lowNowPrice
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = services;
  }
}
//详情页商铺数据集合
class shopInformation{
  constructor(shop){
    this.shopLogo=shop.shopLogo
    this.name=shop.name
    this.score=shop.score
    this.cgoods=shop.cGoods
    this.csells=shop.cSells
  }
}

export{
  types,OFFSET_TOP,
  goodsInformation,shopInformation,
  app
}