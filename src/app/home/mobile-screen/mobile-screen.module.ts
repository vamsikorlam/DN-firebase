import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilepopovermobileComponent } from './profilepopovermobile/profilepopovermobile.component';
import { MobileLocationpopoverScreenComponent } from './mobile-locationpopover-screen/mobile-locationpopover-screen.component';
import { MobileScreensRouting } from './mobile-screen.routing';

@NgModule({
  declarations: [ProfilepopovermobileComponent, MobileLocationpopoverScreenComponent],
  imports: [
    CommonModule,
    MobileScreensRouting
  ]
})
export class MobileScreenModule { }
