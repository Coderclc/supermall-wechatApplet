import request from "./network"

function getDetailData(iid) {
  return request({
    url: "/detail",
    data: {
      iid
    }
  })
}
function getDetailsRecommend() {
  return request({
    url: "/recommend",
  });
}
export {
  getDetailData,getDetailsRecommend
}