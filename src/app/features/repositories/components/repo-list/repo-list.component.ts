import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Repository } from '@features/repositories/models';
import { GithubApiService } from '@features/repositories/services';
import { InfiniteScrollDirective } from '@shared/directives/infinite-scroll.directive';
import { RepoItemComponent } from '@features/repositories/components/repo-item/repo-item.component';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-repo-list',
  imports: [InfiniteScrollDirective, RepoItemComponent, RepoItemComponent],
  templateUrl: './repo-list.component.html',
})
export class RepoListComponent implements OnInit {
  repositories: WritableSignal<Repository[]> = signal<Repository[]>([]);
  page: WritableSignal<number> = signal(1);
  loading: WritableSignal<boolean> = signal(false);
  private github: GithubApiService = inject(GithubApiService);
  private toast: ToastService = inject(ToastService);

  ngOnInit(): void {
    this.loadRepos();
  }

  loadRepos(): void {
    if (this.loading()) return;
    this.loading.set(true);

    this.github.getRepositories(this.page()).subscribe({
      next: ({ items }) => {
        this.repositories.update((prev) => [...prev, ...items]);
        this.page.update((n) => n + 1);
      },
      error: () => {
        this.toast.error(
          'Failed to load repositories. Please try again later.',
        );
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
