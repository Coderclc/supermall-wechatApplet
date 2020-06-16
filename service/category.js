import request from "./network"

function getCategoryMenu() {
  return request({
    url: '/category',
  });
}

 function getSubcategory(maitKey) {
  return request({
    url: `/subcategory?maitKey=${maitKey}`,
  })
}

 function getSubcategoryDetail(miniWallkey, type) {
  return request({
    url: `/subcategory/detail?type=${type}&miniWallkey=${miniWallkey}`
  })
}
export{
  getCategoryMenu,
  getSubcategory,
  getSubcategoryDetail
}
