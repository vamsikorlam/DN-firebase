import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../structs/endpoints.enum';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OtherProfileUserService extends BaseService {
  // GET_USER_DATA

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getUserData(user_id: number): Observable<any> {
    return this.post(Endpoints.GET_USER_DATA, { user_id: user_id, fetch: 'user_data' });
  }
}
