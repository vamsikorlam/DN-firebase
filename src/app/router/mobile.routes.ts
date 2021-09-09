import { Routes } from '@angular/router';
import { Path } from '../@core/structs';

export const Mobile_Route: Routes = [
    {
        path: Path.Mobile,
        loadChildren: () =>
            import('../home/mobile-screen/mobile-screen.module').then((m) => m.MobileScreenModule)
    }
]