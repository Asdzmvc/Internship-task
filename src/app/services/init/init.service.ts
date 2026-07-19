import { inject, Injectable } from "@angular/core";
import { MoviesStore, SessionsStore } from "@app/stores";

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private readonly moviesStore = inject(MoviesStore);
  private readonly sessionsStore = inject(SessionsStore);

  init() {
    this.moviesStore.init();
    this.sessionsStore.init();
  }
}