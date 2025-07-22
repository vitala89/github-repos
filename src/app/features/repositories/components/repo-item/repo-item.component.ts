import { Component, inject, input, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Repository } from '@features/repositories';
import { RepoModalComponent } from '@features/repositories/components/repo-modal/repo-modal.component';
import { RatingStore } from '@features/repositories/stores/rating.store';
import {
  BugIcon,
  LucideAngularModule,
  StarIcon,
  UserIcon,
} from 'lucide-angular';
import { StarRatingComponent } from '@shared/ui/star-rating/star-rating.component';

@Component({
  selector: 'app-repo-item',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RepoModalComponent,
    LucideAngularModule,
    StarRatingComponent,
  ],
  templateUrl: './repo-item.component.html',
})
export class RepoItemComponent {
  private readonly ratingStore = inject(RatingStore);

  readonly starIcon = StarIcon;
  readonly bugIcon = BugIcon;
  readonly userIcon = UserIcon;

  repo = input.required<Repository>();

  rating = computed(() => {
    return this.ratingStore.get(String(this.repo().id)) || 0;
  });
}
