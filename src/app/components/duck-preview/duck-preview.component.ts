import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DuckService } from '../../services/duck.service';
import { Duck } from '../../models/Duck';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-duck-preview',
  templateUrl: './duck-preview.component.html',
  styleUrl: './duck-preview.component.css',
   imports: [CommonModule,AsyncPipe]
})
export class DuckPreviewComponent {

  duck$!: Observable<Duck>;

  constructor(public duckService: DuckService) {
    // Use the read-only Observable for rendering
    this.duck$ = this.duckService.duck$;
  }

  /*
  TEACHING POINT:
  Writes call .next(...) directly.

  This is explicit and shows the mechanics:
    next() = "notify all subscribers with new state"
  */
updateNickName(): void {
  alert("Duck updated");

  this.duckService.duckSubject.next({
    ...this.duckService.duckSubject.value, // snapshot read
    nickName: "Sergeant Honk",             // apply patch
  });
}
}