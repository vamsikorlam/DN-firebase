import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Endpoints } from '../structs/endpoints.enum';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SkillsService extends BaseService {
  // GET_USER_SPECIFIC_SKILLS
  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getUserSpecificSkills(user_id: number, pageNo?: number, limit?: number): Observable<any> {
    return this.post(Endpoints.GET_USER_SPECIFIC_SKILLS, { user_id: user_id, pageNo: pageNo, limit: limit });
  }
}
