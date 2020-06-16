import{
  app
}from "../../../../utils/js/const"
Component({
  properties: {
    cartList: {
      type: Array,
      value: []
    }
  },
  methods: {
    // ----------------------事件监听函数----------------------
    onChange(c) {
      //1.1点击取反product的isCheck attr
      const index = c.currentTarget.dataset.index
      const isCheck = !this.data.cartList[index].isCheck
      const isCheckKey = `cartList[${index}].isCheck`
      //1.2修改本地显示数据
      this.setData({
        [isCheckKey]: isCheck
      })
      //1.3update 全局cartList
      app.globalData.cartList[index].isCheck=isCheck
      //2.1发出事件更新totalPrice
      this.triggerEvent('change')
      //3.1 遍历native isCheck 上来先修改成true
      app.globalData.allChecked=true
      this.triggerEvent('checkAllSelected',true)
      this.data.cartList.forEach(item=>{
        if(!item.isCheck){
          app.globalData.allChecked=false
          this.triggerEvent('checkAllSelected',false)
          return
        }
      })
    },
    reduce(c) {
      // 点击button减少商品数目
      this.countChange(c,-1)
    },
    increment(c) {
      // 点击button增加商品数目
      this.countChange(c,+1)
    },
    countChange(c,value){
      const index = c.currentTarget.dataset.index
      const count = this.data.cartList[index].count + value
      if (count >= 1) {
        const countKey = `cartList[${index}].count`
        this.setData({
          [countKey]: count
        })
        app.globalData.cartList[index].count=count
      }
      this.triggerEvent('change')
    },
    //删除商品
    deleteClick(c) {
      const index = c.currentTarget.dataset.index
      const cartList = this.data.cartList
      cartList.splice(index,1)
      this.setData({
        cartList
      })
      app.globalData.cartList=cartList
      this.triggerEvent('change')
      //列表长度为0时切换allCheck
      if(!cartList.length){
      this.triggerEvent('checkAllSelected',false)
      app.globalData.allChecked=false
      }
    },
  }
})