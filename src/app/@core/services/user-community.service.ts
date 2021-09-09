import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseService } from './base.service';
import { Endpoints } from '../../@core/structs/endpoints.enum';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserCommunityService extends BaseService {
  // GET_USER_COMMUNITY

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getUserCommunity(user_id: number, pageNo?: number, limit?: number): Observable<any> {
    return this.post(Endpoints.GET_USER_COMMUNITY, { user_id: user_id, pageNo, limit });
  }
}
