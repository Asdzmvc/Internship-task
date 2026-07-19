import { AgeRatings, Genres, IMovie } from '../models/movie.model';

export const MOCK_MOVIES: IMovie[] = [
  {
    id: 42,
    title: 'The Lion King',
    durationMinutes: 88,
    ageRating: AgeRatings.G,
    rating: 8.5,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZGRiZDZhZjItM2M3ZC00Y2IyLTk3Y2MtMWY5YjliNDFkZTJlXkEyXkFqcGc@._V1_FMjpg_UY2964_.jpg',
    description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    genres: [Genres.Drama, Genres.Animation],
    releaseYear: 1994,
  },
  {
    id: 43,
    title: 'Kill Bill',
    durationMinutes: 111,
    ageRating: AgeRatings.R,
    rating: 8.2,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BNmQyZTMwNTMtM2U0Yy00YTM4LWJmZTgtZWIyYzdjODY4NGY4XkEyXkFqcGc@._V1_FMjpg_UY3000_.jpg',
    description: 'After waking from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.',
    genres: [Genres.Thriller, Genres.Action],
    releaseYear: 2003,
  },
  {
    id: 44,
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    durationMinutes: 178,
    ageRating: AgeRatings.PG13,
    rating: 8.9,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BMzEwYTg2NTMtMTUzYy00ZjE4LThmMjEtZDUyZWM4NzE5MGE5XkEyXkFqcGc@._V1_FMjpg_UY2835_.jpg',
    description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    genres: [Genres.Drama, Genres.Fantasy],
    releaseYear: 2001,
  },
];
