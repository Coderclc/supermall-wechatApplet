Component({
  properties:{
    subcategories:{
      type:Array,
      value:[]
    }
  },
  methods:{
    itemClick(c){
      const index = c.currentTarget.dataset.index
      const link  =this.data.subcategories[index].link
      const linkParse =encodeURIComponent(JSON.stringify(link))
      //跳转页面
      wx.navigateTo({
        url: `/pages/out/out?url=${linkParse}`,
      })
    }
  }
})