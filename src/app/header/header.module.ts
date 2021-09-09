import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { PublicModule } from '../public/public.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { VideoTutorialsComponent } from './video-tutorials/video-tutorials.component';
import { HeaderSearchComponent } from './header-search/header-search.component';
import { LoginModule } from '../components/login/login.module';
import { HeaderSellPopoverComponent } from './header-sell-popover/header-sell-popover.component';
import { HeaderProfilePopoverComponent } from './header-profile-popover/header-profile-popover.component';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { CoreModule } from '../@core/core.module';
import { AppRoutingModule } from '../app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent,
    VideoTutorialsComponent,
    HeaderSearchComponent,
    HeaderSellPopoverComponent,
    HeaderProfilePopoverComponent],
  imports: [
    SharedModule,
    CoreModule,
    GooglePlaceModule,
    CommonModule,
    PublicModule,
    MatSidenavModule,
    PopoverModule.forRoot(),
    LoginModule,
    FormsModule,
    AppRoutingModule,
    BsDropdownModule,
    MatDialogModule
  ],
  entryComponents: [VideoTutorialsComponent],
  exports: [HeaderComponent]
})
export class HeaderModule { }
