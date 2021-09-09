import { Routes } from '@angular/router';
import { AuthGuard } from 'src/app/@core/guards/auth.guard';
import { Path } from "src/app/@core/structs/path.enum";
import { Endpoints } from '../@core/structs/endpoints.enum';
export const PRIVATE_ROUTES: Routes = [
    {
        path: Path.Community,
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('../home/communities/communities.module').then((m) => m.CommunitiesModule)
    }


];
