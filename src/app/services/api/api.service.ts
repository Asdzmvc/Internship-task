import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, delay, map, of } from 'rxjs';

import { MOCK_HALL_SEATS, MOCK_PRICE_CATEGORIES, MOCK_SESSION_SEATS, MOCK_SESSIONS } from '@app/mocks';
import {
  GetMoviesDTO,
  GetSeatsDTO,
  GetSessionSeatsDTO,
  GetSessionsDTO,
  IMovie,
  IPriceCategory,
  ISeat,
  ISession,
  ISessionSeat,
} from '@app/models';
import { MOCK_MOVIES } from '../../mocks/movies.mock';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly httpClient = inject(HttpClient);

  // Real backend provided by our Java integration partner (see Week 4 session).
  // No trailing slash, no /api prefix — matches the Swagger "Servers" base URL exactly.
  private readonly baseUrl = 'https://itpu-digital-cinema-2s7ce.ondigitalocean.app';

  getSessions() {
    return this.httpClient.get<GetSessionsDTO>(`${this.baseUrl}/sessions`, {
      params: { page: 0, size: 10, sort: ['date,asc', 'time,asc'] },
    }).pipe(
      map(response => response.content),
      catchError(
        () => of(MOCK_SESSIONS).pipe(delay(1000)),
      )
    );
  }

  getSessionById(id: number) {
    return this.httpClient.get<ISession>(`${this.baseUrl}/sessions/${id}`).pipe(
      catchError(
        () => of(MOCK_SESSIONS.find(s => s.id === id) ?? null).pipe(delay(1000)),
      )
    );
  }

  getMovieById(id: number) {
    return this.httpClient.get<IMovie>(`${this.baseUrl}/movies/${id}`).pipe(
      catchError(
        () => of(MOCK_MOVIES.find(m => m.id === id) ?? null).pipe(delay(1000)),
      )
    );
  }

  getMovies() {
    return this.httpClient.get<GetMoviesDTO>(`${this.baseUrl}/movies`, {
      params: { page: 0, size: 10, sort: 'title,asc' },
    }).pipe(
      map(response => response.content),
      catchError(
        () => of(MOCK_MOVIES).pipe(delay(1000)),
      )
    );
  }

  getSeats() {
    return this.httpClient.get<GetSeatsDTO>(`${this.baseUrl}/seats`, {
      params: { page: 0, size: 100 },
    }).pipe(
      map(response => response.content),
      catchError(
        () => of(MOCK_HALL_SEATS.filter((s): s is ISeat => s !== null)).pipe(delay(1000)),
      )
    );
  }

  getSeatsByHall(hallId: number) {
    // This endpoint returns a plain array (not paginated), with `null` entries
    // representing empty gaps in the seating layout (aisles, etc).
    return this.httpClient.get<(ISeat | null)[]>(`${this.baseUrl}/seats/hall/${hallId}`).pipe(
      catchError(
        () => of(MOCK_HALL_SEATS).pipe(delay(1000)),
      )
    );
  }

  getSessionSeats() {
    return this.httpClient.get<GetSessionSeatsDTO>(`${this.baseUrl}/session-seats`, {
      params: { page: 0, size: 100 },
    }).pipe(
      map(response => response.content.map(normalizeSessionSeat)),
      catchError(
        () => of(MOCK_SESSION_SEATS).pipe(delay(1000)),
      )
    );
  }

  getSessionSeatById(id: number) {
    return this.httpClient.get<ISessionSeat>(`${this.baseUrl}/session-seats/${id}`).pipe(
      map(seat => seat ? normalizeSessionSeat(seat) : seat),
      catchError(
        () => of(MOCK_SESSION_SEATS.find(s => s.id === id) ?? null).pipe(delay(1000)),
      )
    );
  }

  getSessionSeatsBySession(sessionId: number) {
    // Plain array response (not paginated).
    return this.httpClient.get<ISessionSeat[]>(`${this.baseUrl}/session-seats/session/${sessionId}`).pipe(
      map(seats => seats.map(normalizeSessionSeat)),
      catchError(
        () => of(MOCK_SESSION_SEATS.filter(s => s.sessionId === sessionId)).pipe(delay(1000)),
      )
    );
  }

  getPriceCategories() {
    // The backend has no price-categories endpoint at all (confirmed via Swagger) —
    // there's nothing to call, so we always use our own mock pricing instead of
    // wasting a request that would just 404.
    return of(MOCK_PRICE_CATEGORIES).pipe(delay(300));
  }
}

/**
 * The real backend serializes `isAvailable` on session-seats as the STRING
 * "true"/"false" instead of a real boolean (a backend quirk, confirmed in Swagger).
 * This normalizes it back into an actual boolean so the rest of the app
 * (which expects ISessionSeat.isAvailable to be a boolean) works unchanged.
 */
function normalizeSessionSeat(seat: ISessionSeat): ISessionSeat {
  return {
    ...seat,
    isAvailable: (seat.isAvailable as unknown as string | boolean) === true
      || (seat.isAvailable as unknown as string) === 'true',
  };
}