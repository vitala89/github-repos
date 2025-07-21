import { Routes } from '@angular/router';
import { RepoListComponent } from './components/repo-list/repo-list.component';

export const repositoriesRoutes: Routes = [
  {
    path: '',
    component: RepoListComponent,
  },
];
