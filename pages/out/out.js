Page({
  data:{
    url:''
  },
  onLoad(c){
    const url  =JSON.parse(decodeURIComponent(c.url))
    this.setData({
      url
    })
  }
})