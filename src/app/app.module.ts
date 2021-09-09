import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { JwtInterceptor, ServerErrorInterceptor, AuthInterceptor } from './@core/interceptors';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CoreModule } from './@core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ngxModule } from './ngxbootstrap/ngxbootstrap.module';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { AuthService } from './@core/services/auth.service';
import { SharedModule } from './shared/shared.module';
import { HeaderModule } from './header/header.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
// import { OtherProfileComponent } from './components/other-profile/other-profile.component';
import { environment } from 'src/environments/environment';
import { AccountActivationComponent } from './components/account-activation/account-activation.component';
import { PasswordChangeComponent } from './components/password-change/password-change.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
// import { HashLocationStrategy, LocationStrategy } from '@angular/common';
// import { ForgetpasswordComponent } from './components/forgetpassword/forgotpassword.component';
// import { StringLengthModule } from './@core/pipes/stringlengthreduce/string-length.module';
@NgModule({
  declarations: [AppComponent, AccountActivationComponent, PasswordChangeComponent, ForgotpasswordComponent],
  imports: [
    GooglePlaceModule,
    NgxSkeletonLoaderModule,
    SocialLoginModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatSliderModule, HttpClientModule,
    CommonModule, CoreModule, SharedModule, HeaderModule, ngxModule,
    LazyLoadImageModule

  ],
  providers: [
    AuthService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.google_client_id
            )
          },

          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(environment.fb_app_id)
          }

          // {
          //   provide: LocationStrategy, useClass: HashLocationStrategy
          // }

        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig
    },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
