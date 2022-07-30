//This is my app's ROOT component
import { Component } from '@angular/core';
console.log(`app.component.ts running`);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}