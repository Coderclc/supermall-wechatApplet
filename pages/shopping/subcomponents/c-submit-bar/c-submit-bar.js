
const app =getApp()
Component({
  properties:{
    totalPrice:{
      type:Number,
      value:0
    },
    allChecked:{
      type:Boolean,
      value:true
    }
  },
  methods:{
    onChange(){
      const allChecked=!this.data.allChecked
      this.setData({
        allChecked
      })
      app.globalData.allChecked=allChecked
      this.triggerEvent('checkIsCheck',allChecked)
    }
  }
})