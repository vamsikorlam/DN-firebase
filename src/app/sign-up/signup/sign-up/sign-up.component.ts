import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';
// import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Location } from '@angular/common';
import { Path } from 'src/app/@core/structs/path.enum';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HeaderFooterSharedService } from 'src/app/@core/services/header-footer-shared.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { countriesList } from './countries'

interface Country {
  value: number;
  label: String;
}



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  //cnts: Country[] = countries;
  countriesData: any = countriesList
  registerform: any;
  profile: any = "";
  show: any = true;
  show1: any = true;
  disableSignupBtn = false;
  colorTheme = 'theme-default';
  ignoreDatePickerWhenopend = true;
  userAgreementUrl: string = "https://stg2.dailynickel.com/users";

  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private fb: FormBuilder, private service: AuthService, private location: Location, private router: Router, private headerFooterService: HeaderFooterSharedService,
    public breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    console.log('countries', this.countriesData);
    for (let obj of this.countriesData) {
      console.log('asdad', obj);
    }

    this.breakpointObserver
      .observe(['(max-width: 767px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {

          this.headerFooterService.setHeaderFooterControl(false, false);

        }
        else {
          this.headerFooterService.setHeaderFooterControl(true, true);
        }
      });
    this.forminit();
    // this.service.error$.subscribe(error => { console.log(error) })
    // this.service.sucess$.subscribe(success => {
    //   if (success) {
    //     console.log(success); this.registerform.reset();
    //     this.router.navigateByUrl(`/${Path.Home}`);
    //     this.service.loginPopUpOpen();
    //   }

    // })
  }



  applyTheme(pop: any) {
    // create new object on each property change
    // so Angular can catch object reference change
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    setTimeout(() => {
      pop.show();
    });
  }

  forminit() {
    this.registerform = this.fb.group(
      {
        firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.pattern('(?=.*[!@#$%^&*_0-9])(?=.*[A-Z])(?=.*[a-z]).*$'), Validators.minLength(8)]],
        confirmpassword: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        dob: ['', [Validators.required, this.validDate]],
        city: ['', Validators.required],
        country: ['USA', Validators.required],
        image: [''],
        termsandconditions: ['', Validators.required]

      },

      {
        validator: [this.mustmatch('password', 'confirmpassword')],

      }

    )
  }

  fileseleted(event) {
    //console.log(event);
    // this.profile=event.target.files[0];
    var reader = new FileReader();
    // this.imagePath = files;
    let formGroup: FormGroup = this.registerform;
    const control = formGroup.controls['image'];



    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
      console.log(file.size);
      console.log(file.type);
      const filesize = Math.round((file.size / 1024));
      console.log(file.type.match(/image\/*/));
      if ((file.type.match(/image\/*/) != null) && filesize <= 1024 * 25) {
        console.log('inside')
        this.registerform.patchValue({
          image: file
        });

        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (_event) => {
          this.profile = reader.result;
        }
        control.setErrors(null)
      }
      else {
        if ((filesize >= 1024 * 25)) {

          control.setErrors({ filesize: true })
        }
        else {
          control.setErrors({ filesize: null })
        }
        if (file.type.match(/image\/*/) == null) {
          console.log('inside')
          control.setErrors({ filetype: true })
        }
        else {
          control.setErrors(null)
        }


      }

      console.log(this.registerform.value);
      // this..patchValue({
      //   fileSource: file
      // });
    }


  }


  //date validation
  validDate(control: FormControl) {

    console.log(control.value)
    if (control.value == "Invalid Date") {
      return { invalidDate: true };
    }
    else {
      console.log(control.value);
      if (control.value) {
        console.log(control.value);
        let birthDay = control.value;
        let ageDifMs = Date.now() - birthDay.getTime();
        let ageDate = new Date(ageDifMs); // miliseconds from epoch
        if (Math.abs(ageDate.getUTCFullYear() - 1970) > 18) {
          return null;
        }
        return { ageError: true }

      }
    }
    return null;
  }



  handler(input: string) {

    if (input == "onShown") {
      this.ignoreDatePickerWhenopend = false;
    }
    else {
      this.ignoreDatePickerWhenopend = true;
    }
  }
  profilepreview() {

    let profile = this.profile ? this.profile : "assets/images/signupimages/profile_default.png";
    // console.log(this.profile);
    return profile;
  }

  formsubmit() {
    console.log(this.registerform.value);
    this.disableSignupBtn = true;
    this.service.signUp(this.registerform.value).subscribe(user => {
      console.log(user);
      alert("You have been successfully registered! please verify email address for confirmation")
      this.disableSignupBtn = false;
      this.registerform.reset();
      this.router.navigateByUrl(`/${Path.Home}`);
      this.service.loginPopUpOpen();
    }, error => {
      console.log(error);
      alert(`${error.errors.error_text}`);
      this.disableSignupBtn = false;
    });
  }

  showhidebtn(i) {
    if (i == 1) {
      this.show ? this.show = false : this.show = true;
    }
    if (i == 2) {
      this.show1 ? this.show1 = false : this.show1 = true;
    }

  }

  patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }
  mustmatch(password, confirmpassword) {

    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmpassword];
      //console.log(control);

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  acceptTermsandConditions() {

    if (!this.registerform.value.termsandconditions) {
      this.registerform.patchValue({ 'termsandconditions': '' });
    }
    else {
      console.log('entered');
      setTimeout(() => { window.alert('You have successfully accepted Terms and Conditions.') }, 500)
    }
    // }

    // console.log(this.registerform.value.termsandconditions);
    // console.log(this.registerform.value.firstname)

  }
  navigatetoTerms() {
    window.open(this.userAgreementUrl, '_blank');
  }
  checkClicked(): Boolean {
    if (this.registerform.value.termsandconditions) {
      return true;
    }
    return false;
  }

  navigateToPreviosPage() {
    this.location.back();
  }

  cityChange(city): void {
    console.log(city.formatted_address);
    this.registerform.patchValue({ 'city': city.formatted_address })

  }

  countyChange(country): void {
    console.log(country.formatted_address);
    this.registerform.patchValue({ 'country': country.formatted_address })
  }

  ngOnDestroy(): void {
    this.headerFooterService.setHeaderFooterControl(true, true);
  }


}
