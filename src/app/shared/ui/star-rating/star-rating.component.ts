import {
  Component,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html',
})
export class StarRatingComponent {
  value: InputSignal<number> = input(0);
  rated: OutputEmitterRef<number> = output<number>();

  set(val: number): void {
    this.rated.emit(val);
  }
}
