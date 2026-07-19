import { Component, input } from '@angular/core';
import { ISeat } from '@app/models';
import { SeatComponent } from '../seat/seat.component';

@Component({
  selector: 'app-row',
  imports: [SeatComponent],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
  standalone: true,
})
export class RowComponent {
  seats = input.required<(ISeat | null)[]>();
}
