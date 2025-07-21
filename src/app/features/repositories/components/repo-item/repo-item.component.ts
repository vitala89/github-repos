import { Component, input, ViewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Repository } from '@features/repositories';
import { RepoModalComponent } from '@features/repositories/components/repo-modal/repo-modal.component';

@Component({
  selector: 'app-repo-item',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RepoModalComponent],
  templateUrl: './repo-item.component.html',
})
export class RepoItemComponent {
  repo = input.required<Repository>();
  @ViewChild(RepoModalComponent) modal!: RepoModalComponent;
}
