import { Component, inject } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../services/public.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-event',
  imports: [Header, Footer, NgOptimizedImage],
  templateUrl: './event.html',
  styleUrl: './event.scss',
})
export class Event {
  private route = inject(ActivatedRoute);
  publicService = inject(PublicService);
  events = toSignal(
    this.publicService.eventFiles(this.route.snapshot.params['eventId']),
    { initialValue: { data: [], pagination: {}, success: true } }
  );
}
