import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { computed, inject, Signal } from '@angular/core';
import { ApiService } from '@app/services';
import { IMovie } from '../../models/movie.model';

type MoviesState = {
  currentMovieID: number | null;
  movies: IMovie[];
  isLoading: boolean;
};

const initialState: MoviesState = {
  currentMovieID: null,
  movies: [],
  isLoading: false,
};

export const MoviesStore = signalStore(
  { providedIn: 'root' },
  withState<MoviesState>(initialState),
  withMethods(
    (store, apiService = inject(ApiService)) => ({
    init() {
      patchState(store, () => ({ isLoading: true }));

      apiService.getMovies().subscribe((movies: IMovie[]) => {
        patchState(store, () => ({
          movies,
          isLoading: false,
        }));
      });
    },

    loadMovieById(id: number) {
      patchState(store, () => ({ isLoading: true }));

      apiService.getMovieById(id).subscribe((movie) => {
        if (movie) {
          patchState(store, (state) => ({
            movies: state.movies.some(m => m.id === movie.id)
              ? state.movies.map(m => m.id === movie.id ? movie : m)
              : [...state.movies, movie],
            isLoading: false,
          }));
        } else {
          patchState(store, () => ({ isLoading: false }));
        }
      });
    },

    getMovieById(id: number): Signal<IMovie | undefined> {
      return computed(() =>
        store.movies().find(movie => movie.id === id)
      );
    },

    setCurrentMovieID(currentMovieID: number | null) {
      patchState(store, () => ({ currentMovieID }));
    },

    setLoading(isLoading: boolean) {
      patchState(store, () => ({ isLoading }));
    },

    setMovies(movies: IMovie[]) {
      patchState(store, () => ({ movies }));
    },
  })),
);
