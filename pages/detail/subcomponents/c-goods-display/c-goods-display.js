Component({
  data:{
  },
  properties:{
    detailInfo:{
      type:Object,
      value:{}
    }
  },
  methods:{
    imageLoad(){
      this.timer&&clearTimeout(this.timer)
      this.timer = setTimeout(()=>{
        this.triggerEvent('imageDone')
      },10)
    }
  }
})