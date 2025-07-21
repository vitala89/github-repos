import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Repository } from '@features/repositories/models';

@Component({
  selector: 'app-repo-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './repo-modal.component.html',
})
export class RepoModalComponent {
  repo = input.required<Repository>();
  modalId = input.required<string>();
}
