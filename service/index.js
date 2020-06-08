import request from "./network"

function getHomeData() {
  return request({
    url: "/home/multidata"
  })
}

export {
  getHomeData
}