Component({
  data: {
    activeKey: 0,
  },
  properties:{
    categories:{
      type:Array,
      value:[]
    }
  },
  methods:{
    onChange(c){
      this.triggerEvent('sideBarClick',c.detail)
    }
  }
})