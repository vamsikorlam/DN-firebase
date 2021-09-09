import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Path } from '../@core/structs/path.enum';
import { HomeComponent } from './home.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent},
  {
    path: Path.Product,
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsModule),
  },
  {
    path: Path.Map,
    component: MapComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
