import { Component, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repository } from '@features/repositories/models';
import { RatingStore } from '@features/repositories/stores/rating.store';
import { StarRatingComponent } from '@shared/ui/star-rating/star-rating.component';

@Component({
  selector: 'app-repo-modal',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './repo-modal.component.html',
})
export class RepoModalComponent {
  private readonly ratingStore = inject(RatingStore);

  repo = input.required<Repository>();
  modalId = input.required<string>();

  rate(stars: number): void {
    this.ratingStore.set(String(this.repo().id), stars);
  }

  rating(): number {
    return this.ratingStore.get(String(this.repo().id)) || 0;
  }
}
