import { ISeat, SeatStatus } from '../models/seat.model';

function seat(
  id: number,
  row: number,
  number: number,
  priceCategoryId: number,
  status: SeatStatus = SeatStatus.Active,
  comment: string | null = null
): ISeat {
  return { id, hallId: 14, row, number, priceCategoryId, status, isAvailable: status === SeatStatus.Active, comment };
}

// Full hall layout ordered by row; null = empty/aisle position within a row.
// Rows 1–3: economy (priceCategoryId 1); Rows 4–6: VIP (2); Rows 7–8: standard (1).
export const MOCK_HALL_SEATS: (ISeat | null)[] = [
  // Row 1 — 6 seats, economy
  seat(101, 1, 1, 1), seat(102, 1, 2, 1), seat(103, 1, 3, 1),
  null,
  seat(104, 1, 4, 1), seat(105, 1, 5, 1), seat(106, 1, 6, 1),

  // Row 2 — 8 seats, economy
  seat(201, 2, 1, 1), seat(202, 2, 2, 1), seat(203, 2, 3, 1), seat(204, 2, 4, 1),
  null,
  seat(205, 2, 5, 1), seat(206, 2, 6, 1), seat(207, 2, 7, 1), seat(208, 2, 8, 1),

  // Row 3 — 10 seats, economy
  seat(301, 3, 1, 1), seat(302, 3, 2, 1), seat(303, 3, 3, 1), seat(304, 3, 4, 1), seat(305, 3, 5, 1),
  null,
  seat(306, 3, 6, 1), seat(307, 3, 7, 1, SeatStatus.Deactivated, 'Broken seat'),
  seat(308, 3, 8, 1), seat(309, 3, 9, 1), seat(310, 3, 10, 1),

  // Row 4 — 12 seats, VIP
  seat(401, 4, 1, 2), seat(402, 4, 2, 2), seat(403, 4, 3, 2),
  seat(404, 4, 4, 2), seat(405, 4, 5, 2), seat(406, 4, 6, 2),
  null,
  seat(407, 4, 7, 2), seat(408, 4, 8, 2), seat(409, 4, 9, 2),
  seat(410, 4, 10, 2), seat(411, 4, 11, 2), seat(412, 4, 12, 2),

  // Row 5 — 12 seats, VIP
  seat(501, 5, 1, 2), seat(502, 5, 2, 2), seat(503, 5, 3, 2),
  seat(504, 5, 4, 2), seat(505, 5, 5, 2), seat(506, 5, 6, 2),
  null,
  seat(507, 5, 7, 2), seat(508, 5, 8, 2), seat(509, 5, 9, 2),
  seat(510, 5, 10, 2), seat(511, 5, 11, 2), seat(512, 5, 12, 2),

  // Row 6 — 12 seats, VIP
  seat(601, 6, 1, 2), seat(602, 6, 2, 2), seat(603, 6, 3, 2),
  seat(604, 6, 4, 2), seat(605, 6, 5, 2), seat(606, 6, 6, 2),
  null,
  seat(607, 6, 7, 2), seat(608, 6, 8, 2), seat(609, 6, 9, 2),
  seat(610, 6, 10, 2), seat(611, 6, 11, 2), seat(612, 6, 12, 2),

  // Row 7 — 12 seats, standard
  seat(701, 7, 1, 1), seat(702, 7, 2, 1), seat(703, 7, 3, 1),
  seat(704, 7, 4, 1), seat(705, 7, 5, 1), seat(706, 7, 6, 1),
  null,
  seat(707, 7, 7, 1), seat(708, 7, 8, 1), seat(709, 7, 9, 1),
  seat(710, 7, 10, 1), seat(711, 7, 11, 1), seat(712, 7, 12, 1),

  // Row 8 — 10 seats, standard
  seat(801, 8, 1, 1), seat(802, 8, 2, 1), seat(803, 8, 3, 1),
  seat(804, 8, 4, 1), seat(805, 8, 5, 1),
  null,
  seat(806, 8, 6, 1), seat(807, 8, 7, 1), seat(808, 8, 8, 1),
  seat(809, 8, 9, 1), seat(810, 8, 10, 1, SeatStatus.Deactivated, 'Broken seat'),
];

export const MOCK_SEATS: ISeat[] = MOCK_HALL_SEATS.filter((s): s is ISeat => s !== null);
