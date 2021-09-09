import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { ForgotPasswordServiceService } from 'src/app/@core/services/forgot-password-service.service';
import { Router } from '@angular/router';
function passwordsMatch(registerForm: FormGroup): ValidatorFn {
  const password = registerForm.get('password');
  const confirmPassword = registerForm.get('confirmPassword');

  if (password.value === confirmPassword.value) {
    confirmPassword.setErrors(null);
  } else {

    confirmPassword.setErrors({
      'passwordMatch': true
    })

  }
  return null;
}

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  passwordChange: FormGroup;
  showPassword = 1;

  constructor(private builder: FormBuilder, private forgotPasswordService: ForgotPasswordServiceService, private route: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.passwordChange = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  // password: ['', [Validators.required, Validators.pattern('(?=.*[!@#$%^&*_0-9])(?=.*[A-Z])(?=.*[a-z]).*$'), Validators.minLength(4)]],
  //     confirmPassword: ['']
  //   }, {
  //     validators: [passwordsMatch]
  //   }

  handleSubmit() {
    console.log(this.passwordChange.value);
    this.forgotPasswordService.changePasswordSendEmail(this.passwordChange.value.email).subscribe((response) => {
      console.log(response);
      window.alert("Please check your email");
      this.navigatetohome();
    }, (error) => {
      console.log(error);
    });
  }


  showhidebtn(arg) {
    console.log('called');
    this.showPassword = arg;
  }
  changeType() {
    return this.showPassword == 1 ? 'password' : 'text';
  }

  navigatetohome(): void {
    this.passwordChange.reset();
    this.route.navigate([''])
  }


}
