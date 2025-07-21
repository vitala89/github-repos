import { Component } from '@angular/core';
import { MOCK_REPOSITORIES } from '@mocks/mock-repositories';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-repo-list',
  imports: [NgOptimizedImage],
  templateUrl: './repo-list.component.html',
})
export class RepoListComponent {
  protected readonly repos = MOCK_REPOSITORIES;
}
