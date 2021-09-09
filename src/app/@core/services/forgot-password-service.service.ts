import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable, of, throwError } from 'rxjs';
import { exhaustMap } from 'rxjs/operators';
import { Path } from 'src/app/@core/structs/path.enum'
import { Endpoints } from '../structs/endpoints.enum';
@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordServiceService extends BaseService {

  constructor(private http: HttpClient) {
    super(http)
  }
  changePasswordSendEmail(email: string): Observable<any> {
    return this.post(Endpoints.FORGOT_PASSWORD, { email }).pipe((exhaustMap((data: {
      api_status: number,
      message: string
    }) => {
      if (data.api_status == 200) {
        return of(data)
      }
      else {
        return throwError(data);
      }

    })))
  }

  changePassword(code: string, password: string): Observable<any> {
    return this.post(Endpoints.FORGOT_PASSWORD_CHANGE, { code, password }).pipe((exhaustMap((data: any) => {
      if (data.api_status == 220 || data.api_status == 200) {
        return of(data);
      }
      return throwError(data);
    })))
  }

}


