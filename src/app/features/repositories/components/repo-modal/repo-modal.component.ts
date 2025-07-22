import {
  Component,
  input,
  inject,
  ElementRef,
  ViewChild,
  signal,
  computed,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Repository } from '@features/repositories/models';
import { RatingStore } from '@features/repositories/stores/rating.store';
import { StarRatingComponent } from '@shared/ui/star-rating/star-rating.component';
import { ToastService } from '@core/services/toast.service';
import {
  BugIcon,
  LucideAngularModule,
  StarIcon,
  UserIcon,
  XIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-repo-modal',
  standalone: true,
  imports: [
    CommonModule,
    StarRatingComponent,
    LucideAngularModule,
    NgOptimizedImage,
  ],
  templateUrl: './repo-modal.component.html',
})
export class RepoModalComponent {
  private readonly ratingStore = inject(RatingStore);
  private readonly toast = inject(ToastService);

  readonly starIcon = StarIcon;
  readonly bugIcon = BugIcon;
  readonly userIcon = UserIcon;
  readonly xIcon = XIcon;

  @ViewChild('modalRef', { static: true })
  modalRef!: ElementRef<HTMLDialogElement>;

  repo = input.required<Repository>();
  modalId = input.required<string>();

  readonly pendingStars = signal<number | undefined>(undefined);

  readonly currentRating = computed(
    () => this.ratingStore.get(String(this.repo().id)) || 0,
  );

  readonly displayStars = computed(
    () => this.pendingStars() ?? this.currentRating(),
  );

  setPendingStars(stars: number): void {
    this.pendingStars.set(stars);
  }

  onToggle(event: Event): void {
    const dialog = event.target as HTMLDialogElement;
    const pending = this.pendingStars();
    if (!dialog.open && pending != null) {
      const prev = this.currentRating();

      if (pending === prev) {
        this.pendingStars.set(undefined);
        return;
      }

      if (pending === 0) {
        setTimeout(() => {
          this.toast.warning(
            `You cancelled your vote for "${this.repo().name}".`,
          );
          this.ratingStore.set(String(this.repo().id), 0);
          this.pendingStars.set(undefined);
        }, 100);
        return;
      }

      this.ratingStore.set(String(this.repo().id), pending);
      setTimeout(() => {
        this.toast.success(
          `You gave ${pending}★ to the repository "${this.repo().name}"`,
        );
        this.pendingStars.set(undefined);
      }, 100);
    }
  }
}
