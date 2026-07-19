import { signalStore, withState, withMethods, patchState, type } from '@ngrx/signals';
import { ISession } from '@app/models';
import { computed, inject, Signal } from '@angular/core';
import { ApiService } from '@app/services';
import { setEntities, upsertEntity, withEntities } from '@ngrx/signals/entities';

type SessionsState = {
  currentSessionID: number | null;
  isLoading: boolean;
};

const initialState: SessionsState = {
  currentSessionID: null,
  isLoading: false,
};

enum SessionsCollections {
  Sessions = 'sessions',
}

const sessionId = (session: ISession) => session.id;

export const SessionsStore = signalStore(
  { providedIn: 'root' },
  withState<SessionsState>(initialState),
  withEntities<ISession, SessionsCollections.Sessions>({
    entity: type<ISession>(),
    collection: SessionsCollections.Sessions,
  }),
  withMethods(
    (store, apiService = inject(ApiService)) => ({
    init() {
      patchState(store, () => ({ isLoading: true }));

      apiService.getSessions().subscribe((sessions: ISession[]) => {
        patchState(store, () => ({ isLoading: false }));

        patchState(store, setEntities(sessions, {
          selectId: sessionId,
          collection: SessionsCollections.Sessions,
        }));
      });
    },

    loadSessionById(id: number) {
      patchState(store, () => ({ isLoading: true }));

      apiService.getSessionById(id).subscribe((session) => {
        if (session) {
          patchState(store, upsertEntity(session, {
            selectId: sessionId,
            collection: SessionsCollections.Sessions,
          }));
        }
        patchState(store, () => ({ isLoading: false }));
      });
    },

    getSessionById(id: number): Signal<ISession | undefined> {
      return computed(() =>
        store.sessionsEntities().find(session => session.id === id)
      );
    },

    setCurrentSessionID(currentSessionID: number | null) {
      patchState(store, () => ({ currentSessionID }));
    },

    setSessions(sessions: ISession[]) {
      patchState(store, setEntities(sessions, {
        selectId: sessionId,
        collection: SessionsCollections.Sessions,
      }));
    },

    setLoading(isLoading: boolean) {
      patchState(store, () => ({ isLoading }));
    },
  })),
);
