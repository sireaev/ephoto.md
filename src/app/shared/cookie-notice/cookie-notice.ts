import { Component, OnInit, signal } from '@angular/core';

const STORAGE_KEY = 'cookie-notice-dismissed';

@Component({
  selector: 'app-cookie-notice',
  imports: [],
  templateUrl: './cookie-notice.html',
  styleUrl: './cookie-notice.scss',
})
export class CookieNotice implements OnInit {
  visible = signal(false);

  ngOnInit() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      this.visible.set(true);
    }
  }

  dismiss() {
    localStorage.setItem(STORAGE_KEY, '1');
    this.visible.set(false);
  }
}
