import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ProductsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductsProvider {

  constructor(public http: HttpClient) {
  }

  config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    }
  }

  /**
   * lấy danh sách sản phẩm theo id chủ gian hàng
   * @param shop_id (number) id của chủ gian hàng (aka user)
   * @param page (number) trang thứ mấy
   */
  getProductListByShopId(shop_id: number, page: number) {
    const limit = 10;

    console.log('all shops are here' + page);

    let requestBody = 'search=&user_id='+ shop_id +'&limit=' + limit + '&page=' + page;

    return this.http.post('http://24gocheck.com/index.php?route=api2/product/search', requestBody, this.config);
  }


  /**
   * lấy sản phẩm theo id
   * @param product_id (number) id sản phẩm
   */
  getProductById(product_id: number) {
    let requestBody = 'product_id=' + product_id;
    return this.http.post('http://24gocheck.com/index.php?route=api2/product', requestBody, this.config);
  }

  /**
   * lấy danh sách sản phẩm theo tên
   * @param name (string) tên sản phẩm
   * @param page (number) trang thứ mấy
   */
  searchProductByName(name: string, page: number) {
    const limit = 10;

    let requestBody = 'search='+ name +'&limit=' + limit + '&page=' + page;
    // let requestBody = 'search=&user_id='+ 739 +'limit=' + 1 + '&page=' + 1;

    return this.http.post('http://24gocheck.com/index.php?route=api2/product/search', requestBody, this.config);
  }

  /**
   * lấy danh sách sản phẩm theo category_id
   * @param category_id (number) id của danh mục
   * @param page (number) trang thứ mấy
   */
  getProductsByCategoryId(category_id: number, page: number) {
    const limit = 10;

    let requestBody = 'search=&category_id='+ category_id +'&limit=' + limit + '&page=' + page;

    return this.http.post('http://24gocheck.com/index.php?route=api2/product/search', requestBody, this.config);
  }

  /**
   * lấy danh sách sản phẩm theo zone_id
   * @param zone_id (number) id của thành phố
   * @param page (number) trang thứ mấy
   */
  getProductsByZoneId(zone_id: number, page: number) {
    const limit = 10;

    let requestBody = 'search=&zone_id='+ zone_id +'&limit=' + limit + '&page=' + page;

    return this.http.post('http://24gocheck.com/index.php?route=api2/product/search', requestBody, this.config);
  }

  addReview(product_id,reviewer_name,text){
    const rating =1;
    let requestBody = `product_id=${product_id}&name=${reviewer_name}&rating=${rating}&text=${text}`;
    return this.http.post('http://24gocheck.com/index.php?route=api2/product/addreview', requestBody, this.config);
  }
}
