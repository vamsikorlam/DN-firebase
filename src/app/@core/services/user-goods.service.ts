import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../structs/endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class UserGoodsService extends BaseService {
  // GET_USER_GOODS

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getUserGoods(user_id, pageNo?: number, limit?: number) {
    return this.post(Endpoints.GET_USER_GOODS, { user_id: user_id, pageNo: pageNo, limit: limit })
  }
}
