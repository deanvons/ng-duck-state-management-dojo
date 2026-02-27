import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DuckService } from '../../services/duck.service';
import { Duck } from '../../models/Duck';
import { AsyncPipe, CommonModule } from '@angular/common';

/*
COMPONENT USING ASYNC PIPE

Instead of manually subscribing, we expose an Observable to the template
and let Angular manage subscription lifecycle.

The async pipe:
- subscribes automatically when the component renders
- updates the template when new values arrive
- unsubscribes automatically when the component is destroyed
*/

@Component({
  selector: 'app-duck-preview',
  templateUrl: './duck-preview.component.html',
  styleUrl: './duck-preview.component.css',
  imports: [CommonModule,AsyncPipe]
})
export class DuckPreviewComponent {

  /*
  `$` suffix: stream of Duck values.
  Template will use: duck$ | async
  */
 duck$!: Observable<Duck>;

constructor(private duckService: DuckService) {
  this.duck$ = this.duckService.duck$;
}

  updateNickName(currentDuck: Duck): void {
    this.duckService.Duck = {
      ...currentDuck,
      nickName: 'Sergeant Honk'
    };
  }
}