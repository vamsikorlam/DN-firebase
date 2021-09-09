import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupRoutingModule } from './sign-up-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignUpComponent } from './signup/sign-up/sign-up.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    GooglePlaceModule,
    BsDatepickerModule.forRoot()
  ]
})
export class SignUpModule { }
