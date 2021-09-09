import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { MapComponent } from './map/map.component';
import { AgmCoreModule } from '@agm/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LayoutModule } from '@angular/cdk/layout'

@NgModule({
  declarations: [HomeComponent, MapComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    SlickCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbc3z9cj_nER7kpuXTN46LtWoUoQ9uBno',
      libraries: ['places']
    }),
    SharedModule,
    LazyLoadImageModule,
    LayoutModule,
    MatDialogModule
  ]
})
export class HomeModule { }
