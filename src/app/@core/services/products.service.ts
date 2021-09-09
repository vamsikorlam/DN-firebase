import { Injectable } from '@angular/core';
import { getItem, removeItem, setItem, StorageItem } from 'src/app/@core/utils';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../../@core/structs/endpoints.enum';


@Injectable({
  providedIn: 'root'
})
export class ProductsService extends BaseService {
  authToken = new BehaviorSubject<string>(getItem(StorageItem.AUTHENTICATION) as string);


  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getProductCategories(type: string) {
    return this.post(Endpoints.GET_PRODUCT_CATEGORIES, { type: type })
  }

  getSkillsCategories(type: string) {
    return this.post(Endpoints.GET_SKILLS_CATEGORIES, { type: type })
  }

  getProducts(lat?: number, lng?: number, pageNo?: number, limit?: number) {
    return this.post(Endpoints.GET_PRODUCTS, { lat: lat, lng: lng, pageNo: pageNo, limit: limit })
  }

  getProductDetails(productId: number) {
    return this.post(Endpoints.GET_PRODUCT_DETAILS, { product_id: productId })
  }

  getSimilarProducts(productId: number, lat: number = 0, lng: number = 0, pageNo = 1, length = 25) {
    console.log(productId, lat, lng, pageNo, length);
    return this.post(Endpoints.GET_SIMILAR_PRODUCTS, { product_id: productId, lat, lng, pageNo, length })
  }

  likeProduct(productId: number) {
    return this.post(Endpoints.LIKE_PRODUCT, { product_id: productId })
  }

  searchProducts(params: {
    lat?: number, lng?: number, pageNo?: number,
    limit?: number, milesSelected?: string[],
    order?: string, orderdir?: string, keyword?: string,
    category_id?: number, price_min?: number, price_max?: number
  }) {
    return this.post(Endpoints.SEARCH_PRODUCTS, params);
  }
}
