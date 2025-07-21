import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/repositories/repositories.routes').then(
        (m) => m.repositoriesRoutes,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
