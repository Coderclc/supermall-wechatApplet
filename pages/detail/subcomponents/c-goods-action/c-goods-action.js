import Toast from "../../../../miniprogram_npm/@vant/weapp/toast/toast"
Component({
  methods:{
    shopNowClick(){
      Toast('谢谢惠顾');
    },
    onClickIcon() {
      Toast('暂未开通');
    },
    addToCart() {
      this.triggerEvent('addToCart')
    }, 
  }
})