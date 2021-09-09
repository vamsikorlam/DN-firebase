import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Endpoints } from '../structs/endpoints.enum';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class UserSkillsService extends BaseService {
  // GET_USER_SKILLS

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  getUserSkills(user_id: number, pageNo?: number, limit?: number): Observable<any> {
    return this.post(Endpoints.GET_USER_SKILLS, { user_id: user_id, pageNo: pageNo, limit: limit });
  }
}
