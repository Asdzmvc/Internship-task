import { Component, computed, inject, input } from '@angular/core';
import { MapStore } from '../../../stores/map/map.store';
import { ISeat } from '@app/models';

@Component({
  selector: 'app-seat',
  imports: [],
  templateUrl: './seat.component.html',
  styleUrl: './seat.component.scss',
  standalone: true,
})
export class SeatComponent {
  private readonly mapStore = inject(MapStore);

  seat = input<ISeat | null>(null);

  isBooked = computed(() => {
    const id = this.seat()?.id;
    if (id == null) return false;
    return this.mapStore.isSeatBooked(id);
  });

  isSelected = computed(() => {
    const id = this.seat()?.id;
    if (id == null) return false;
    return this.mapStore.selectedSeatsEntities().some(s => s.id === id);
  });

  toggle() {
    const seat = this.seat();
    if (!seat || this.isBooked()) return;
    this.mapStore.toggleSeat(seat, !this.isSelected());
  }
}
