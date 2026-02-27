import { Component } from '@angular/core';
import { DuckService } from '../../services/duck.service';

@Component({
  selector: 'app-duck-preview',
  templateUrl: './duck-preview.component.html',
  styleUrl: './duck-preview.component.css',
})
export class DuckPreviewComponent {
  constructor(public duckService: DuckService) {}

  updateNickName(): void {
    alert('Duck updated');

    // Similar to BehaviorSubject.value + next(...)
    // Read current: duck()
    // Write next:   duck.update(...)
    this.duckService.duck.update(d => ({
      ...d,
      nickName: 'Sergeant Honk',
    }));
  }
}