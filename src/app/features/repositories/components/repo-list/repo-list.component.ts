import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Repository } from '@features/repositories/models';
import { GithubApiService } from '@features/repositories/services';
import { InfiniteScrollDirective } from '@shared/directives/infinite-scroll.directive';

@Component({
  selector: 'app-repo-list',
  imports: [NgOptimizedImage, InfiniteScrollDirective],
  templateUrl: './repo-list.component.html',
})
export class RepoListComponent implements OnInit {
  repositories: WritableSignal<Repository[]> = signal<Repository[]>([]);
  page: WritableSignal<number> = signal(1);
  loading: WritableSignal<boolean> = signal(false);
  private github: GithubApiService = inject(GithubApiService);

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
      error: (err) => console.error(err),
      complete: () => this.loading.set(false),
    });
  }
}
