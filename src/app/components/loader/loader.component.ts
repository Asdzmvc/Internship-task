import { Component } from '@angular/core';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-loader',
  imports: [ProgressSpinner],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  standalone: true,
})
export class LoaderComponent {}
