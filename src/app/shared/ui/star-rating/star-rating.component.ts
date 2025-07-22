import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
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

  set(val: number): void {
    if (!this.readonly()) {
      this.rated.emit(val);
    }
  }
}
