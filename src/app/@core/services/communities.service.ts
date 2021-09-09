import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../structs/endpoints.enum';

@Injectable({
  providedIn: 'root'
})
export class CommunitiesService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getMyCommunities(pageNo?: number, limit?: number): Observable<any> {
    return this.post(Endpoints.GET_MY_COMMUNITIES, { pageNo, limit });
  }

  getRecommendedCommunities(lat?: number, lng?: number, pageNo?: number, limit?: number): Observable<any> {
    return this.post(Endpoints.GET_RECOMMENDED_COMMUNITIES, { lat, lng, pageNo, limit });
  }

  getCommunityProfile(id: number): Observable<any> {
    return this.post(Endpoints.GET_COMMUNITY_PROFILE, { group_id: id });
  }

  getUserCommunity(user_id: number, pageNo?: number, limit?: number): Observable<any> {
    return this.post(Endpoints.GET_USER_COMMUNITY, { user_id, pageNo, limit });
  }

  searchCommunities(filter: any): Observable<any> {
    return this.post(Endpoints.SEARCH_COMMUNITIES, filter);
  }

  searchOnAllCommunities(filter: any): Observable<any> {
    return this.post(Endpoints.SEARCH_ON_ALL_COMMUNITIES, filter);
  }
}
