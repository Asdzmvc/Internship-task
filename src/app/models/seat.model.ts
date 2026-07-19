export interface ISeat {
  id: number;
  hallId: number;
  priceCategoryId: number;
  row: number;
  number: number;
  status: SeatStatus;
  isAvailable: boolean;
  comment: string | null;
}

export interface ISessionSeat {
  id: number;
  sessionId: number;
  seatId: number;
  status: SeatStatus;
  isAvailable: boolean;
  customerName: string | null;
  contact: string | null;
}

export enum SeatStatus {
  Active = 'ACTIVE',
  Deactivated = 'DEACTIVATED',
}

export enum SeatKind {
  Chair = 'CHAIR',
  Luxury = 'LUXURY',
  Sofa = 'SOFA',
  Special = 'SPECIAL',
}
