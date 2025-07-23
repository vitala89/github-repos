import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Repository } from '@features/repositories/models';
import {
  BugIcon,
  LucideAngularModule,
  StarIcon,
  UserIcon,
} from 'lucide-angular';
import { StarRatingComponent } from '@shared/ui/star-rating/star-rating.component';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    LucideAngularModule,
    StarRatingComponent,
  ],
  templateUrl: './item-card.component.html',
})
export class ItemCardComponent {
  readonly starIcon = StarIcon;
  readonly bugIcon = BugIcon;
  readonly userIcon = UserIcon;

  repo = input.required<Repository>();
  rating = input<number>(0);
  readonly = input<boolean>(false);
  compact = input<boolean>(false);
  clickable = input<boolean>(false);
  modalId = input<string>('');
}
