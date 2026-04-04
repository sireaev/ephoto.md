import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Footer } from '../../shared/footer/footer';
import { Header } from '../../shared/header/header';
import { PublicService } from '../services/public.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-category-events',
  imports: [Header, Footer, RouterLink, NgOptimizedImage],
  templateUrl: './category-events.html',
  styleUrl: './category-events.scss',
})
export class CategoryEvents {
  private route = inject(ActivatedRoute);
  publicService = inject(PublicService);
  events = toSignal(
    this.publicService.categoryEvents(this.route.snapshot.params['slug']),
    { initialValue: { data: [], pagination: {}, success: true } }
  );
}
