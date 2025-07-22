import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '@core/themes/theme.service';
import {
  LucideAngularModule,
  SunIcon,
  MoonIcon,
  StarIcon,
} from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, LucideAngularModule],
  templateUrl: './app.html',
})
export class App {
  readonly sunIcon = SunIcon;
  readonly moonIcon = MoonIcon;

  theme = inject(ThemeService);
  protected readonly starIcon = StarIcon;
}
