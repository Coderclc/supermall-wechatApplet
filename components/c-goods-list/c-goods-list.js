Component({
  properties:{
    goods:{
      type:Array,
      value:[]
    }
  },
  methods:{
    imageClick(c){
      const id = this.data.goods[c.currentTarget.dataset.index].iid
      if(id){
        wx.navigateTo({
          url: `/pages/detail/detail?id=${id}`,
        })
      }
    },
  }
})
