import { Routes } from '@angular/router';
import { Path } from '../@core/structs';
import { AccountActivationComponent } from '../components/account-activation/account-activation.component'
import { PasswordChangeComponent } from '../components/password-change/password-change.component';
import { ForgotpasswordComponent } from '../components/forgotpassword/forgotpassword.component';
import { Mobile_Route } from './mobile.routes';
export const PUBLIC_ROUTES: Routes = [
  {
    path: Path.Home,
    loadChildren: () =>
      import('../home/home.module').then((m) => m.HomeModule),
  },
  {
    path: Path.SignUp,
    loadChildren: () =>
      import('../sign-up/sign-up.module').then((m) => m.SignUpModule)
  },
  {
    path: Path.AccountActivation,
    component: AccountActivationComponent
  },
  {
    path: Path.ChangePassword,
    component: PasswordChangeComponent
  },
  {
    path: Path.ForgotPassword,
    component: ForgotpasswordComponent
  }
  // ...Mobile_Route

];
