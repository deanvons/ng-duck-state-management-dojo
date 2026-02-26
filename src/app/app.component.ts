import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DuckDetailsComponent } from './components/duck-details/duck-details.component';
import { DuckPreviewComponent } from './components/duck-preview/duck-preview.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,DuckDetailsComponent,DuckPreviewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-state-management-dojo';
}
