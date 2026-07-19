import { IPriceCategory, PriceCategories } from '../models/price-category.model';

// priceCategoryId on ISeat is a number (1 or 2, see seats.mock.ts), but IPriceCategory.id
// is typed as string to match the backend spec — so we compare with String(seat.priceCategoryId).
export const MOCK_PRICE_CATEGORIES: IPriceCategory[] = [
  { id: '1', type: PriceCategories.Regular, name: 'Standard', price: 35000 },
  { id: '2', type: PriceCategories.Luxury, name: 'VIP', price: 65000 },
];