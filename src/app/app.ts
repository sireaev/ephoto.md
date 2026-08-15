import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast/toast';
import { CookieNotice } from './shared/cookie-notice/cookie-notice';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent, CookieNotice],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('ephoto.md');
}
