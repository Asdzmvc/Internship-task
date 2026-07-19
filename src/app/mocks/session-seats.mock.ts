import { ISessionSeat, SeatStatus } from '../models/seat.model';

export const MOCK_SESSION_SEATS: ISessionSeat[] = [
  // Session 1 (hall 14)
  {
    id: 501,
    sessionId: 1,
    seatId: 103,
    status: SeatStatus.Active,
    isAvailable: true,
    customerName: null,
    contact: null,
  },
  {
    id: 502,
    sessionId: 1,
    seatId: 205,
    status: SeatStatus.Active,
    isAvailable: false,
    customerName: 'John Doe',
    contact: '+998901234567',
  },
  {
    id: 503,
    sessionId: 1,
    seatId: 405,
    status: SeatStatus.Active,
    isAvailable: false,
    customerName: 'Maria Garcia',
    contact: '+998902222222',
  },
  {
    id: 504,
    sessionId: 1,
    seatId: 506,
    status: SeatStatus.Active,
    isAvailable: false,
    customerName: 'Alice Smith',
    contact: '+998907654321',
  },
  {
    id: 505,
    sessionId: 1,
    seatId: 507,
    status: SeatStatus.Active,
    isAvailable: false,
    customerName: 'Bob Johnson',
    contact: '+998901111111',
  },
  // Session 2 (hall 14)
  {
    id: 506,
    sessionId: 2,
    seatId: 305,
    status: SeatStatus.Active,
    isAvailable: false,
    customerName: 'David Lee',
    contact: '+998903333333',
  },
  {
    id: 507,
    sessionId: 2,
    seatId: 502,
    status: SeatStatus.Active,
    isAvailable: true,
    customerName: null,
    contact: null,
  },
];

