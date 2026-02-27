import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DuckService } from '../../services/duck.service';
import { Duck } from '../../models/Duck';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-duck-details',
  templateUrl: './duck-details.component.html',
  styleUrl: './duck-details.component.css',
  imports: [CommonModule],
})
export class DuckDetailsComponent {
  readonly duck;
  private duckService;

  constructor(duckService: DuckService) {
    this.duckService = duckService;
    this.duck = this.duckService.duck; // signal exposed to template
  }
}
