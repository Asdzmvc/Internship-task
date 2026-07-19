import { Component, computed, inject, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { SessionsStore } from '../../stores/sessions/sessions.store';
import { MoviesStore } from '@app/stores';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-session-list',
  imports: [Button, RouterLink],
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.scss',
  standalone: true,
})
export class SessionListComponent {
  private readonly moviesStore = inject(MoviesStore);
  private readonly sessionsStore = inject(SessionsStore);

  protected readonly searchQuery = signal('');

  // The shared backend sometimes contains duplicate session rows (same movie,
  // date, time, and hall but different IDs) since multiple students can post
  // test data to it. We collapse those down to a single card, keeping the
  // one with the lowest ID.
  private readonly dedupedSessions = computed(() => {
    const allSessions = this.sessionsStore.sessionsEntities();
    const seen = new Map<string, (typeof allSessions)[number]>();

    for (const session of allSessions) {
      const key = `${session.movieId}-${session.date}-${session.time}-${session.hallId}`;
      const existing = seen.get(key);

      if (!existing || session.id < existing.id) {
        seen.set(key, session);
      }
    }

    return [...seen.values()];
  });

  // Filters the deduped sessions down to ones whose movie title matches the
  // current search query (case-insensitive). Empty query = show everything.
  protected readonly sessions = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();

    if (!query) {
      return this.dedupedSessions();
    }

    return this.dedupedSessions().filter(session => {
      const movie = this.moviesStore.getMovieById(session.movieId)();
      return movie?.title.toLowerCase().includes(query) ?? false;
    });
  });

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  getMovieById(movieId: number) {
    return this.moviesStore.getMovieById(movieId);
  }
}