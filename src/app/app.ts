import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InitService } from './services';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
})
export class App implements OnInit {
  private readonly initService = inject(InitService);

  ngOnInit() {
    this.initService.init();
  }
}