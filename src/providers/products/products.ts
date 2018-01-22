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

  getProductListByShopId(shop_id: number, page: number) {
    const limit = 10;

    console.log('all shops are here' + page);



    let requestBody = 'search=&user_id='+ shop_id +'&limit=' + limit + '&page=' + page;
    // let requestBody = 'search=&user_id='+ 739 +'limit=' + 1 + '&page=' + 1;

    return this.http.post('http://24gocheck.com/index.php?route=api2/product/search', requestBody, this.config);
  }


  getProductById(product_id: number) {
    let requestBody = 'product_id=' + product_id;
    return this.http.post('http://24gocheck.com/index.php?route=api2/product', requestBody, this.config);
  }


  searchProductByName(name: string, page: number) {
    const limit = 10;

    let requestBody = 'search='+ name +'&limit=' + limit + '&page=' + page;
    // let requestBody = 'search=&user_id='+ 739 +'limit=' + 1 + '&page=' + 1;

    return this.http.post('http://24gocheck.com/index.php?route=api2/product/search', requestBody, this.config);
  }

  getProductsByCategoryId(category_id: number, page: number) {
    const limit = 10;

    let requestBody = 'search=&category_id='+ category_id +'&limit=' + limit + '&page=' + page;

    return this.http.post('http://24gocheck.com/index.php?route=api2/product/search', requestBody, this.config);
  }

  getProductsByZoneId(zone_id: number, page: number) {
    const limit = 10;

    let requestBody = 'search=&zone_id='+ zone_id +'&limit=' + limit + '&page=' + page;

    return this.http.post('http://24gocheck.com/index.php?route=api2/product/search', requestBody, this.config);
  }

}
