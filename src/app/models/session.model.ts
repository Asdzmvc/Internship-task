import { MovieFormat, MovieLang } from './movie.model';

export interface ISession {
  id: number;
  movieId: number;
  hallId: number;
  title: string;
  date: string; // ISO format: '2026-07-15'
  time: string; // 'HH:mm:ss': '19:30:00'
  language: MovieLang;
  format: MovieFormat;
}

export interface ICinema {
  id: string
  name: string
  address: string
  city: string
}
