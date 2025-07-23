import { Component, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repository } from '@features/repositories';
import { RepoModalComponent } from '@features/repositories/components/repo-modal/repo-modal.component';
import { RatingStore } from '@features/repositories/stores/rating.store';
import { ItemCardComponent } from '@shared/ui/item-card/item-card.component';

@Component({
  selector: 'app-repo-item',
  standalone: true,
  imports: [CommonModule, RepoModalComponent, ItemCardComponent],
  templateUrl: './repo-item.component.html',
})
export class RepoItemComponent {
  private readonly ratingStore = inject(RatingStore);

  repo = input.required<Repository>();

  rating = computed(() => {
    return this.ratingStore.get(String(this.repo().id)) || 0;
  });
}
