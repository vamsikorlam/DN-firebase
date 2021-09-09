import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  httpOptions = {
    headers: new HttpHeaders({})
  };

  protected constructor(private httpClient: HttpClient) {
  }

  private static handleError(error: HttpErrorResponse): any {
    // TODO - Handle errors
    return throwError(error);
  }

  private static getFormData(item: any): FormData {
    const formData: FormData = new FormData();
    for (const key of Object.keys(item)) {
      formData.append(key, item[key]);
    }
    return formData;
  }

  post(path: string, body: any): Observable<any> {
    console.log('post called')
    return this.httpClient.post(`${environment.apiUrl}${path}`, BaseService.getFormData(body), this.httpOptions)
      .pipe(map((data: any) => {
        return data;
      }), catchError(BaseService.handleError));
  }
}
