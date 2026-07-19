import { ISession } from '../models';
import { MovieFormat, MovieLang } from '../models/movie.model';

export const MOCK_SESSIONS: ISession[] = [
  {
    id: 1,
    movieId: 42,
    hallId: 14,
    title: 'The Lion King - Evening Show',
    date: '2026-07-15',
    time: '19:30:00',
    language: MovieLang.English,
    format: MovieFormat.TwoD,
  },
  {
    id: 2,
    movieId: 43,
    hallId: 14,
    title: 'Kill Bill - Night Show',
    date: '2026-07-15',
    time: '22:10:00',
    language: MovieLang.Russian,
    format: MovieFormat.IMAX,
  },
  {
    id: 3,
    movieId: 44,
    hallId: 15,
    title: 'The Lord of the Rings: The Fellowship of the Ring - Matinee',
    date: '2026-07-16',
    time: '11:00:00',
    language: MovieLang.English,
    format: MovieFormat.ThreeD,
  },
];
