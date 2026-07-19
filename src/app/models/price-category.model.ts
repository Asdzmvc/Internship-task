export interface IPriceCategory {
  id: string
  type: PriceCategories
  name: string
  price: number
}

export enum PriceCategories {
  Luxury = 'LUXURY',
  Regular = 'REGULAR',
  Economy = 'ECONOMY',
}
