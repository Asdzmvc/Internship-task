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
  protected readonly isCheckingOut = this.mapStore.isCheckingOut;
  protected readonly checkoutError = this.mapStore.checkoutError;

  getSeatPrice(seat: ISeat): number {
    return this.mapStore.getPriceForSeat(seat);
  }

  removeSeat(seat: ISeat) {
    this.mapStore.toggleSeat(seat, false);
  }

  checkout() {
    // Minimal customer info collection — there's no dedicated form/auth flow
    // yet, so we just ask for a name and contact number right here.
    const customerName = prompt('Name for this booking:');
    if (!customerName) return;

    const contact = prompt('Contact phone number:');
    if (!contact) return;

    this.mapStore.checkout(customerName, contact);
  }
}