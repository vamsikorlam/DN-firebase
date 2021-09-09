import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ForgotPasswordServiceService } from 'src/app/@core/services/forgot-password-service.service'
import { Path } from 'src/app/@core/structs';
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
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  passwordChange: FormGroup;
  showPassword = 1;
  code: string;
  constructor(private builder: FormBuilder, private router: Router, private Ar: ActivatedRoute, private forgetPassword: ForgotPasswordServiceService) { }

  ngOnInit(): void {
    this.buildForm();
    this.code = this.Ar.snapshot.queryParamMap.get('code');
  }

  buildForm() {
    this.passwordChange = this.builder.group({
      password: ['', [Validators.required, Validators.pattern('(?=.*[!@#$%^&*_0-9])(?=.*[A-Z])(?=.*[a-z]).*$'), Validators.minLength(4)]],
      confirmPassword: ['']
    }, {
      validators: [passwordsMatch]
    })
  }

  handleSubmit() {
    console.log(this.passwordChange.get('password'));
    this.forgetPassword.changePassword(this.code, this.passwordChange.get('password').value).subscribe((response) => {
      console.log(response);
      this.passwordChange.reset();
      this.router.navigate([`${Path.Home}`]);

    }, error => {
      console.log(error);
      alert(error.errors.error_text);
    });
  }
  showhidebtn(arg) {
    console.log('called');
    this.showPassword = arg;
  }
  changeType() {
    return this.showPassword == 1 ? 'password' : 'text';
  }

}
