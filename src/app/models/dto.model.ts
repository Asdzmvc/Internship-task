import { IMovie } from './movie.model';
import { ISession } from './session.model';
import { ISeat, ISessionSeat } from './seat.model';

export interface ISort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface IPagedResponse<T> {
  content: T[];
  pageable: IPageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  sort: ISort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface GetMoviesDTO extends IPagedResponse<IMovie> {}

export interface GetSessionsDTO extends IPagedResponse<ISession> {}

export interface GetSeatsDTO extends IPagedResponse<ISeat> {}

export interface GetSessionSeatsDTO extends IPagedResponse<ISessionSeat> {}