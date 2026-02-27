import { Component } from '@angular/core';
import { DuckService } from '../../services/duck.service';

@Component({
  selector: 'app-duck-preview',
  templateUrl: './duck-preview.component.html',
  styleUrl: './duck-preview.component.css',
})
export class DuckPreviewComponent {
  readonly duck;
  private duckService;

  constructor(duckService: DuckService) {
    this.duckService = duckService;
    this.duck = this.duckService.duck; // signal exposed to template
  }

  updateNickName(): void {
    this.duckService.updateNickName('Sergeant Honk');
  }
}
