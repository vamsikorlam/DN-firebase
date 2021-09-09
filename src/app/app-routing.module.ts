import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './router';
import { NotFoundComponent } from './public/not-found/not-found.component';
@NgModule({
  imports: [
    RouterModule.forRoot(
      [...PUBLIC_ROUTES, ...PRIVATE_ROUTES,
      {
        path: '**', component: NotFoundComponent
      }
      ],
      {
        preloadingStrategy: PreloadAllModules,
        scrollPositionRestoration: 'enabled'
      },
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
