import { Component, computed, inject, input } from '@angular/core';
import { SessionsStore } from '../../stores/sessions/sessions.store';
import { MoviesStore } from '../../stores/movies/movies.store';

@Component({
  selector: 'app-session-header',
  imports: [],
  templateUrl: './session-header.component.html',
  styleUrl: './session-header.component.scss',
  standalone: true,
})
export class SessionHeaderComponent {
  private readonly moviesStore = inject(MoviesStore);
  private readonly sessionsStore = inject(SessionsStore);

  movieId = input.required<number>();
  sessionId = input.required<number>();

  movie = computed(() =>
    this.moviesStore.getMovieById(this.movieId())()
  );
  session = computed(() => 
    this.sessionsStore.getSessionById(this.sessionId())()
  );
}
