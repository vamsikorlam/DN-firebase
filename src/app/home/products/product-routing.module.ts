import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Path } from 'src/app/@core/structs/path.enum';
import { OtherProfileComponent } from 'src/app/components/other-profile/other-profile.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { AuthGuard } from 'src/app/@core/guards';
const routes: Routes = [{
  path: Path.ProductDetails,
  component: ProductDetailsComponent
},
{
  path: Path.ProductSearch,
  component: ProductSearchComponent
},
{
  path: Path.OtherProfile,
  canActivate: [AuthGuard],
  component: OtherProfileComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
