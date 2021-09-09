import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Path } from 'src/app/@core/structs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isLoggedIn = this.authService.checkUser();
    if (isLoggedIn) {
      return true;
    }
    this.router.navigateByUrl(`/${Path.Home}`);
    this.authService.loginPopUpOpen();

    // if not logged in redirects to sign-in page with the return url
    // TODO - Handle un- authorized page
    this.router.navigate([`/${Path.Home}`], {
      /*queryParams: { returnUrl: state.url },*/
    });

    return false;
  }
}
