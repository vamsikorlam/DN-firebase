// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacebookLoginProvider, GoogleLoginProvider, SocialUser } from "angularx-social-login";
import { SocialAuthService } from "angularx-social-login";
import { AuthService } from '../../@core/services/auth.service';
import { Path } from 'src/app/@core/structs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CommingSoonComponent } from 'src/app/shared/modalpopups/comming-soon/comming-soon.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginform: any;
  form2test: any;
  show = true;
  error: any;
  socialUser: SocialUser;
  isLoggedin: boolean;
  @ViewChild('template') public template: TemplateRef<any>;
  modalRef: BsModalRef;
  constructor(private dialog: MatDialog, private fb: FormBuilder, private service: AuthService, private route: Router, private socialAuthService: SocialAuthService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.formInit();
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      if (user != null) {
        this.service.socialLogin(this.socialUser.authToken, this.socialUser.provider).subscribe((data) => { console.log(data); this.closeModal(); this.route.navigateByUrl('/') }, (error) => {
          console.log(error);
          alert(error.errors.error_text);
        });
      }
    });
    this.service.openloginmodal$.subscribe((opened) => {
      if (opened) {
        this.openModal(this.template);
      }
      else {
        this.closeModal();
      }

    })
  }

  formInit(): void {
    this.loginform = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  // , Validators.email

  loginFormSubmit() {
    this.service.SignIn(this.loginform.value).subscribe((user) => {
      this.loginform.reset();
      this.closeModal();
      this.route.navigateByUrl('/')
    }, error => {
      alert(error.errors.error_text);
      //console.log(error, 'error occurred');
    });
  }

  showhidebtn() {
    this.show ? this.show = false : this.show = true;
  }

  loginWithGoogle(): void {
    console.log('google')
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
  }

  closeModal(): void {
    this.loginform.reset();
    this.modalService.hide();
  }

  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template);
  }

  registernavigation() {
    console.log("called");
    this.route.navigateByUrl(`/${Path.SignUp}`);
    this.closeModal();
  }

  openDialogComingsoon(): void {
    this.dialog.open(CommingSoonComponent, {
      panelClass: 'custom-dialog-container', autoFocus: false,
      disableClose: false, maxWidth: '100vw'
    });
  }

  navigateToForgotPassword(): void {
    this.route.navigate([`/${Path.ForgotPassword}`]);
  }



}
