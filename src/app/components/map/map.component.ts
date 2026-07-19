import { Component, inject } from '@angular/core';
import { MapStore } from '../../stores/map/map.store';
import { RowComponent } from './row/row.component';

@Component({
  selector: 'app-map',
  imports: [RowComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
  standalone: true,
})
export class MapComponent {
  protected readonly mapStore = inject(MapStore);
}
