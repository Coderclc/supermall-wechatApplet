Component({
  data:{
    titles:['商品','参数','评论','推荐'],
    currentIndex:0
  },
  methods:{
    backClick(){
      wx.navigateBack({delta:1})
    },
    onClick(c){
      const index=c.currentTarget.dataset.index
      this.setData({
        currentIndex:index
      })
      this.triggerEvent('navBarClick',index)
    }
  }
})