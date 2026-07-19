import { computed, inject } from '@angular/core';
import { patchState, signalStore, type, withComputed, withMethods, withState } from '@ngrx/signals';
import { addEntity, removeAllEntities, removeEntity, withEntities } from '@ngrx/signals/entities';
import { IPriceCategory, ISeat, ISessionSeat } from '@app/models';
import { ApiService } from '@app/services';
import { forkJoin } from 'rxjs';

type MapState = {
  hallSeats: (ISeat | null)[];
  sessionSeats: ISessionSeat[];
  priceCategories: IPriceCategory[];
  isLoading: boolean;
};

const initialState: MapState = {
  hallSeats: [],
  sessionSeats: [],
  priceCategories: [],
  isLoading: false,
};

enum MapCollections {
  SelectedSeats = 'selectedSeats',
}

const selectedSeatId = (seat: ISeat) => seat.id;

export const MapStore = signalStore(
  { providedIn: 'root' },
  withState<MapState>(initialState),
  withEntities<ISeat, MapCollections.SelectedSeats>({
    entity: type<ISeat>(),
    collection: MapCollections.SelectedSeats,
  }),
  withComputed((store) => ({
    rows: computed(() => {
      const seats = store.hallSeats();
      const rows: (ISeat | null)[][] = [];
      let currentRow: (ISeat | null)[] = [];
      let currentRowNum: number | null = null;

      for (const seat of seats) {
        if (seat !== null) {
          if (currentRowNum === null) {
            currentRowNum = seat.row;
          } else if (seat.row !== currentRowNum) {
            rows.push(currentRow);
            currentRow = [];
            currentRowNum = seat.row;
          }
        }
        currentRow.push(seat);
      }

      if (currentRow.length > 0) {
        rows.push(currentRow);
      }

      return rows;
    }),

    /** Sum of the prices of every currently selected seat. */
    cartTotal: computed(() =>
      store.selectedSeatsEntities().reduce((sum, seat) => {
        const category = store.priceCategories().find(c => c.id === String(seat.priceCategoryId));
        return sum + (category?.price ?? 0);
      }, 0)
    ),
  })),
  withMethods((store, apiService = inject(ApiService)) => ({
    loadHall(hallId: number, sessionId: number) {
      patchState(store, () => ({ isLoading: true }));

      forkJoin({
        seats: apiService.getSeatsByHall(hallId),
        sessionSeats: apiService.getSessionSeatsBySession(sessionId),
        priceCategories: apiService.getPriceCategories(),
      }).subscribe(({ seats, sessionSeats, priceCategories }) => {
        patchState(store, () => ({
          hallSeats: seats,
          sessionSeats,
          priceCategories,
          isLoading: false,
        }));
      });
    },

    isSeatBooked(seatId: number): boolean {
      return store.sessionSeats().some(s => s.seatId === seatId && !s.isAvailable);
    },

    toggleSeat(seat: ISeat, checked: boolean) {
      if (checked) {
        patchState(store, addEntity(
          seat,
          { collection: MapCollections.SelectedSeats, selectId: selectedSeatId }
        ));
      } else {
        patchState(store, removeEntity(
          seat.id,
          { collection: MapCollections.SelectedSeats }
        ));
      }
    },

    /** Looks up the ticket price for a specific seat via its price category. */
    getPriceForSeat(seat: ISeat): number {
      return store.priceCategories().find(c => c.id === String(seat.priceCategoryId))?.price ?? 0;
    },

    /** Empties the cart — used after the (placeholder) checkout action. */
    clearSelection() {
      patchState(store, removeAllEntities({ collection: MapCollections.SelectedSeats }));
    },
  })),
);