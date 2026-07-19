export interface IMovie {
  id: number
  title: string
  durationMinutes: number
  ageRating: AgeRatings
  rating: number
  posterUrl: string
  description: string
  // Not returned by the real backend (only present in mock data) — kept optional
  // so the app doesn't break when this field is simply absent from the API response.
  genres?: Genres[]
  releaseYear: number
}

export enum AgeRatings {
  G = 'G',
  PG = 'PG',
  PG13 = 'PG_13',
  R = 'R',
  NC17 = 'NC_17',
}

export enum Genres {
  Action = 'ACTION',
  Animation = 'ANIMATION',
  Comedy = 'COMEDY',
  Documentary = 'DOCUMENTARY',
  Drama = 'DRAMA',
  Fantasy = 'FANTASY',
  Horror = 'HORROR',
  SciFi = 'SCI_FI',
  Romance = 'ROMANCE',
  Thriller = 'THRILLER',
}

export enum MovieLang {
  English = 'ENGLISH',
  Russian = 'RUSSIAN',
  Uzbek = 'UZBEK',
}

export enum MovieFormat {
  TwoD = 'TWO_D',
  ThreeD = 'THREE_D',
  IMAX = 'IMAX',
}
