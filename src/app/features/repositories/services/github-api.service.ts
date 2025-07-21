import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from '../models/repository.model';

@Injectable({ providedIn: 'root' })
export class GithubApiService {
  private readonly BASE_URL = 'https://api.github.com/search/repositories';
  private http: HttpClient = inject(HttpClient);

  getRepositories(page = 1): Observable<{ items: Repository[] }> {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const created = date.toISOString().split('T')[0];
    const url = `${this.BASE_URL}?q=created:>${created}&sort=stars&order=desc&page=${page}`;
    return this.http.get<{ items: Repository[] }>(url);
  }
}
