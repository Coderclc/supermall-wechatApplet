Component({
  data: {
    currentIndex: 0
  },
  methods: {
    itemClick(event) {
      this.triggerEvent("tabControl",{index:event.detail.index})
    },
  },
  properties: {
    titles: {
      type: Array,
      value: []
    }
  },
  externalClasses: ["sticky"]
})