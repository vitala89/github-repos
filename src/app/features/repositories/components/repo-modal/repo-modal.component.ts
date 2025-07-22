import { Component, input, inject, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repository } from '@features/repositories/models';
import { RatingStore } from '@features/repositories/stores/rating.store';
import { StarRatingComponent } from '@shared/ui/star-rating/star-rating.component';
import { ToastService } from '@core/services/toast.service';

@Component({
  selector: 'app-repo-modal',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './repo-modal.component.html',
})
export class RepoModalComponent {
  private readonly ratingStore = inject(RatingStore);
  private readonly toast = inject(ToastService);

  @ViewChild('modalRef', { static: true })
  modalRef!: ElementRef<HTMLDialogElement>;

  private lastStars?: number;
  repo = input.required<Repository>();
  modalId = input.required<string>();

  rate(stars: number): void {
    this.ratingStore.set(String(this.repo().id), stars);
    this.lastStars = stars;
  }

  rating(): number {
    return this.ratingStore.get(String(this.repo().id)) || 0;
  }

  onToggle(event: Event): void {
    const dialog = event.target as HTMLDialogElement;
    if (!dialog.open && this.lastStars != null) {
      setTimeout(() => {
        this.toast.success(
          `You gave ${this.lastStars}★ to the repository "${this.repo().name}"`,
        );
        this.lastStars = undefined;
      }, 100);
    }
  }
}
