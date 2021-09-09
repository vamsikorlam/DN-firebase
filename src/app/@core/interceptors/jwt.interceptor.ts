import {
  HttpEvent,
  HttpHandler, HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isLoggedIn = this.authService.checkUser();
    const authToken = this.authService.user$;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    const bodyParams: { _key: string, _value: string }[] = [
      { _key: 'server_key', _value: environment.server_key }
    ];

    if (isLoggedIn && isApiUrl) {
      bodyParams.push({ _value: JSON.parse(authToken.value).access_token, _key: 'access_token' });
    }
    request = this.handleBodyIn(request, bodyParams);
    return next.handle(request);
  }

  handleBodyIn(req: HttpRequest<any>, bodyParams): HttpRequest<any> {
    if (req.method.toLowerCase() === 'post') {
      if (req.body instanceof FormData) {
        for (const item of bodyParams) {
          req = req.clone({
            body: req.body.append(item._key, item._value)
          });
        }
      }
      if (!(req.body instanceof FormData)) {
        const common = {};
        for (const item of bodyParams) {
          common[item.tokenName] = item.token;
        }
        req = req.clone({
          body: { ...req.body, ...common }
        });
      }
    }
    return req;
  }

}
