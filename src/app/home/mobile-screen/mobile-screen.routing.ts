import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Path } from 'src/app/@core/structs/path.enum';
import { ProfilepopovermobileComponent } from './profilepopovermobile/profilepopovermobile.component';
import { MobileLocationpopoverScreenComponent } from './mobile-locationpopover-screen/mobile-locationpopover-screen.component';
const routes: Routes = [
    {
        path: Path.MobileProfilePopOver,
        component: ProfilepopovermobileComponent
    },
    {
        path: Path.MobileLocationSet,
        component: MobileLocationpopoverScreenComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MobileScreensRouting { }
