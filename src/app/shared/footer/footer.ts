import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  clickCount = 0;
  private timeoutRef: any;

  constructor(private router: Router) {}
  onClick() {
    this.clickCount++;

    // Reset timer on each click (optional but recommended)
    clearTimeout(this.timeoutRef);
    this.timeoutRef = setTimeout(() => {
      this.clickCount = 0;
    }, 2000);

    if (this.clickCount === 8) {
      this.clickCount = 0;
      this.router.navigate([environment.path]);
    }
  }
}
