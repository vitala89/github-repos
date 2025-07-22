import { Injectable, signal, WritableSignal } from '@angular/core';

type RatingsData = Record<string, number>;

@Injectable({
  providedIn: 'root',
})
export class RatingStore {
  private static readonly STORAGE_KEY = 'repo-ratings';
  readonly ratings: WritableSignal<RatingsData> = signal(this.loadRatings());

  set(repoId: string, value: number): void {
    const updatedRatings = { ...this.ratings(), [repoId]: value };
    this.ratings.set(updatedRatings);
    this.saveRatings(updatedRatings);
  }

  get(repoId: string, defaultValue = 0): number {
    return this.ratings()[repoId] ?? defaultValue;
  }

  private saveRatings(data: RatingsData): void {
    localStorage.setItem(RatingStore.STORAGE_KEY, JSON.stringify(data));
  }

  private loadRatings(): RatingsData {
    try {
      const storedData = localStorage.getItem(RatingStore.STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : {};
    } catch (error) {
      console.error('Failed to load ratings data:', error);
      return {};
    }
  }
}
