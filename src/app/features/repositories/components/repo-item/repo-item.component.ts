import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Repository } from '@features/repositories';

@Component({
  selector: 'app-repo-item',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './repo-item.component.html',
})
export class RepoItemComponent {
  repo = input.required<Repository>();
}
