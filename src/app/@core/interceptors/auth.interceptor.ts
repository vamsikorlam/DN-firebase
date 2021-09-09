import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Router } from '@angular/router';
import { switchMap } from "rxjs/operators";
import { AuthService } from '../services/auth.service';
import { Path } from '../structs';
import { Endpoints } from "../structs/endpoints.enum";
import { environment } from "src/environments/environment";

@Injectable() export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private route: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Do whatever you want to do with the Request

        if (req.url == Endpoints.GET_LAT_LNG) {
            return next.handle(req);
        }

        req = req.clone({
            body: req.body.append("server_key", environment.server_key)
        })
        if (this.authService.checkUser()) {
            req = this.addKeys(req);
        }

        return next.handle(req).pipe(switchMap((res: any) => {
            if (res instanceof HttpResponse) {
                if (res.body.hasOwnProperty('errors')) {

                    if (res.body.errors.error_text === "Invalid or expired access_token" || res.body.errors.error_text == "Not authorized") {
                        this.authService.logOut();
                        this.route.navigate([Path.Home]);

                    }
                }
            }
            return of(res);
        }))


    }

    addKeys(req: HttpRequest<any>): HttpRequest<any> {
        const accessToken = JSON.parse(localStorage.getItem('user')).access_token;
        req = req.clone({
            body: req.body.append('access_token', accessToken)
        })
        return req;
    }

}
