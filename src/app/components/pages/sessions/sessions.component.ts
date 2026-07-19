import { Component, inject } from '@angular/core';
import { SessionsStore } from '@app/stores';
import { LoaderComponent } from '../../loader/loader.component';
import { SessionListComponent } from '../../session-list/session-list.component';

@Component({
  selector: 'app-sessions',
  imports: [LoaderComponent, SessionListComponent],
  templateUrl: './sessions.component.html',
  styleUrl: './sessions.component.scss',
  standalone: true,
})
export class SessionsComponent {
  private readonly sessionsStore = inject(SessionsStore);

  sessionsLoading = this.sessionsStore.isLoading;
}
