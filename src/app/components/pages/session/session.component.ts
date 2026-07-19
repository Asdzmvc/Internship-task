import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoaderComponent } from '../../loader/loader.component';
import { MapStore, SessionsStore } from '@app/stores';
import { SessionHeaderComponent } from '../../session-header/session-header.component';
import { MapComponent } from '../../map/map.component';
import { CartComponent } from '../../cart/cart.component';

@Component({
  selector: 'app-session',
  imports: [LoaderComponent, MapComponent, SessionHeaderComponent, CartComponent],
  templateUrl: './session.component.html',
  styleUrl: './session.component.scss',
  standalone: true,
})
export class SessionComponent {
  private readonly mapStore = inject(MapStore);
  private readonly sessionsStore = inject(SessionsStore);
  private readonly route = inject(ActivatedRoute);

  readonly sessionId = Number(this.route.snapshot.paramMap.get('id')) || null;
  session = this.sessionId
    ? this.sessionsStore.getSessionById(this.sessionId)
    : signal(undefined);
  sessionLoading = this.sessionsStore.isLoading;
  mapLoading = this.mapStore.isLoading;

  loadmapEffect = effect(() => {
    const session = this.session();
    
    if (!session) return;

    this.sessionsStore.setCurrentSessionID(session.id);
    this.mapStore.loadHall(session.hallId, session.id);
  });
}