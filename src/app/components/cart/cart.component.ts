import { Component, computed, inject } from '@angular/core';
import { Button } from 'primeng/button';
import { ISeat } from '@app/models';
import { MapStore } from '@app/stores';

@Component({
  selector: 'app-cart',
  imports: [Button],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  standalone: true,
})
export class CartComponent {
  protected readonly mapStore = inject(MapStore);

  /** Selected seats, sorted by row then seat number for a predictable cart order. */
  protected readonly selectedSeats = computed(() =>
    [...this.mapStore.selectedSeatsEntities()].sort((a, b) =>
      a.row === b.row ? a.number - b.number : a.row - b.row
    )
  );

  protected readonly total = this.mapStore.cartTotal;

  getSeatPrice(seat: ISeat): number {
    return this.mapStore.getPriceForSeat(seat);
  }

  removeSeat(seat: ISeat) {
    this.mapStore.toggleSeat(seat, false);
  }

  checkout() {
    // No real checkout/payment logic required for this homework — just a UI placeholder.
    alert(`Checkout placeholder — ${this.selectedSeats().length} seat(s), total: ${this.total().toLocaleString()} UZS`);
  }
}