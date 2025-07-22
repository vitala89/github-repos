import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, StarIcon } from 'lucide-angular';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './star-rating.component.html',
})
export class StarRatingComponent {
  value: InputSignal<number> = input(0);
  readonly: InputSignal<boolean> = input(false);
  rated: OutputEmitterRef<number> = output<number>();
  readonly starIcon = StarIcon;

  hoverValue = signal(0);

  rate(val: number): void {
    if (!this.readonly()) {
      if (this.value() === val) {
        this.rated.emit(0);
        this.hoverValue.set(0);
      } else {
        this.rated.emit(val);
      }
    }
  }

  onStarHover(val: number): void {
    if (!this.readonly()) {
      this.hoverValue.set(val);
    }
  }

  onStarsLeave(): void {
    if (!this.readonly()) {
      this.hoverValue.set(0);
    }
  }

  getStarValue(): number {
    return this.hoverValue() > 0 ? this.hoverValue() : this.value();
  }
}
