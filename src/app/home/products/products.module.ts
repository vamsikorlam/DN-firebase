import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductDetailsComponent } from './product-details/product-details.component'
import { ProductRoutingModule } from './product-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox'
import { AgmCoreModule } from '@agm/core';
import { SharedModule } from '../../shared/shared.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { LayoutModule } from '@angular/cdk/layout'
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { NgxPaginationModule } from 'ngx-pagination';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CoreModule } from 'src/app/@core/core.module';
import { FormsModule } from '@angular/forms';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { OtherProfileComponent } from 'src/app/components/other-profile/other-profile.component'
@NgModule({
  declarations: [ProductDetailsComponent, ProductSearchComponent, OtherProfileComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatCardModule,
    MatSliderModule,
    MatCheckboxModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbc3z9cj_nER7kpuXTN46LtWoUoQ9uBno',
      libraries: ['places']
    }),
    SharedModule,
    SlickCarouselModule,
    MatCardModule,
    LayoutModule,
    NgxSliderModule,
    MatProgressSpinnerModule,
    NgxPaginationModule,
    MatRadioModule,
    MatDialogModule,
    CoreModule,
    FormsModule,
    GooglePlaceModule
  ]
})
export class ProductsModule { }
