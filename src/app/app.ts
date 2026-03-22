import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Public } from './public/public';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Public],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ephoto.md');
}
