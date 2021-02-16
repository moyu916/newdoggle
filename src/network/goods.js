import axios from './axios'

export function getCategory() {
  return axios.get('/categories');
}

export function search(params) {
  return axios.get('/search', { params });
}

export function getDetail(id) {
  return axios.get(`/goods/detail/${id}`)
}

// /**要加入购物车的信息 */
// export class product{
//   constructor(iid,itemInfo,skuInfo){
//       this.iid=iid,
//       this.img=itemInfo.topImages[0];
//       this.priceRange=skuInfo.priceRange;//价格区间
//       this.lowNowPrice=itemInfo.lowNowPrice;//价格
//       this.title=itemInfo.title;
//       this.rule=skuInfo.props[1];//尺码
//       this.styleColor=skuInfo.props[0];//颜色
//       this.totalStock=skuInfo.totalStock;
//       this.count=1;//数量
//   }
// }

/**加入购物车的商品信息 */
export class cartProduct{
  constructor(goodsId,goodscoverImage,originalPrice,goodsName,count){
      this.goodsId=goodsId,
      this.checked=false,
      this.goodscoverImage=goodscoverImage;
      this.originalPrice=originalPrice;//价格
      this.goodsName=goodsName;
      this.count=count;//数量
  }
}