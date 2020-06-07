Page({
  onClick(){
    wx.showActionSheet({
      itemList: ["123","!@3","!23"],
    })
  },
  onShareAppMessage(options){
    return{
      title:"hello weChat",
      path:"/pages/profile/profile",
      imageUrl:"https://fanyiapp.cdn.bcebos.com/cms/image/7f182104dfd7b567442affa2ee3e73d5.JPG"
    } 
  }
}) 