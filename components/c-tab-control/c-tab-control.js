Component({
  data: {
    currentIndex: 0
  },
  methods: {
    // native tabControl
    itemClick(event) {
      const index = event.currentTarget.dataset.index
      if (this.data.currentIndex != index) {
        this.setData({
          currentIndex: index
        })
        this.triggerEvent("tabControl", {index})
      }
    }
  },
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },
  externalClasses: ["sticky"]
})