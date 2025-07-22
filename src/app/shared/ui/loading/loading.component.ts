import { Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LoaderIcon } from 'lucide-angular';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './loading.component.html',
})
export class LoadingComponent {
  text: InputSignal<string | null> = input<string | null>(null);
  readonly loaderIcon = LoaderIcon;
}
