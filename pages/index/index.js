import {
  getHomeData
} from "../../service/index.js"

Page({
  data: {
    banners: [],
    recommends: []
  },
  onLoad() {
    getHomeData()
      .then(res => {
        // get index banners and recommends data
        this.setData({
          banners: res.data.data.banner.list,
          recommends: res.data.data.recommend.list
        })
      })
  }
})