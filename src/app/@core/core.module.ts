import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { JwtInterceptor, ServerErrorInterceptor, AuthInterceptor } from './interceptors';
import { AutoFocusDirective } from './directives/auto-focus/auto-focus.directive';
import { StringLengthPipe } from './pipes/stringlengthreduce/string-length.pipe';

@NgModule({
  declarations: [AutoFocusDirective, StringLengthPipe],
  imports: [CommonModule, HttpClientModule],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ServerErrorInterceptor,
    //   multi: true,
    // },
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [AutoFocusDirective, StringLengthPipe]
})
export class CoreModule { }
