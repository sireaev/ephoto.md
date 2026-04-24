import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PublicService } from '../../public/services/public.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgbDropdownModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
    publicService = inject(PublicService);
    topbarPage = signal<any>(null);
    pages = toSignal(
    this.publicService.pages().pipe(
      tap((response) => {
        const topbarPage = response.data.find((page) => page.type === 'topbar');
        if (topbarPage) {
          this.topbarPage.set(topbarPage);
        }

      })
    ),
    { initialValue: { data: [], pagination: {}, success: true } }
  );
}
