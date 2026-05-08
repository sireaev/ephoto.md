import { Component, inject } from '@angular/core';
import { Header } from '../../shared/header/header';
import { Footer } from '../../shared/footer/footer';
import { ActivatedRoute } from '@angular/router';
import { PublicService } from '../services/public.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PhotoPreview } from '../photo-preview/photo-preview';

@Component({
  selector: 'app-event',
  imports: [Header, Footer, NgOptimizedImage, CommonModule],
  templateUrl: './event.html',
  styleUrl: './event.scss',
})
export class Event {
  private route = inject(ActivatedRoute);
  publicService = inject(PublicService);
  modalService = inject(NgbModal);
  events = toSignal(
    this.publicService.eventFiles(this.route.snapshot.params['eventId']),
    { initialValue: { data: [], pagination: {}, success: true } }
  );

  openPhoto(index: number) {
    console.log('pushed')
    const modalRef = this.modalService.open(PhotoPreview, {
      centered: true,
      backdropClass: 'preview-backdrop',
      modalDialogClass: 'preview-modal',
    });
    console.log('index from beginning', index);
    modalRef.componentInstance.startIndex = index; 
    modalRef.componentInstance.images = this.events().data.map(e => e.webUrl);
  }
}
