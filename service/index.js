import request from "./network"

function getHomeData() {
  return request({
    url: "/home/multidata"
  })
}
function getGoodsData(type,page) {
  return request({
    url: "/home/data",
    data:{
      type,
      page
    }
  })
}

export {
  getHomeData,getGoodsData
}